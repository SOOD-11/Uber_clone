import { validationResult } from "express-validator";
import asynchandler from "../utilities/asynchandler.js";
import { Driver } from "../models/Driver.model.js";
import ApiError from "../utilities/ApiError.js";
import jwt from "jsonwebtoken";

const options = {
    httpOnly: true,
    secure: true
  };
const generateAcessandRefreshToken = async (id) => {
    try {
        const driver = await Driver.findById(id);

        const Accesstoken = await driver.generateAccessToken();
        const Refreshtoken = await driver.generateRefreshToken();
        console.log("Access token", Accesstoken);
        console.log("Refresh token", Refreshtoken);
        driver.RefreshToken = Refreshtoken;
        await driver.save({ validateBeforeSave: false });
        return { Accesstoken, Refreshtoken };
    } catch (error) {
        console.error(error);
        throw new ApiError(401, "tokens cant be generated");
    }
};
const DriverRegister = asynchandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({ errors: errors.array() });
    }
    console.log("hello");
    const {
        email,
        fullname: { firstname, lastname },
        VehicleDetails: { vehiclename, vehicletype, plate, Capacity },
        password,
    } = req.body;
    // changed because we have to check numbers as well as String n ot one datatype

    if (
        [
            email,
            firstname,
            lastname,
            plate,
            Capacity,
            vehiclename,
            vehicletype,
            password,
        ].some((superman) => {
            return (
                superman === undefined ||
                superman === null ||
                String(superman).trim() === ""
            );
        })
    ) {
        throw new ApiError(401, "Fill all the credentials");
    }

    const existed = await Driver.findOne({
        $or: [{ email }, { "VehicleDetails.plate": plate }],
    });
    if (existed) {
        if (existed.email === email) {
            throw new ApiError(402, "Driver email already registered");
        }
        if (existed.VehicleDetails.plate === plate) {
            throw new ApiError(402, "Vehicle already registered");
        }
    }
    const Drivers = await Driver.create({
        email,
        password,
        VehicleDetails: {
            vehiclename,
            plate,
            vehicletype,
            Capacity,
        },
        fullname: {
            firstname,
            lastname,
        },
    });
    const drivers = await Driver.findById(Drivers._id).select(
        "-password -RefreshToken"
    );
    return res.status(201).json({ drivers });
});
const loginDriver = asynchandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    if (
        [email, password].some((superman) => {
            return superman?.trim() === "";
        })
    ) {
        throw new ApiError(401, " fill all the credentials");
    }
    const driver = await Driver.findOne({ email: req.body.email });
    if (!driver) {
        throw new ApiError(404, "user not register");
    }
    const ispasswordcorrect = await driver.isPasswordCorrect(password);
    if (!ispasswordcorrect) {
        throw new ApiError(403, "incorrect pssword");
    }
    const { Accesstoken, Refreshtoken } = generateAcessandRefreshToken(
        driver?._id
    );

    return res
        .status(201)
        .cookie("Accesstoken", options)
        .cookie("Refreshtoken", options)
        .json({ message: "logged in", Accesstoken, Refreshtoken });
});

const logoutDriver = asynchandler(async (req, res, next) => {
    await Driver.findByIdAndUpdate(
        req.driver?._id,
        {
            $set: {
                RefreshToken: null,
            },
        },
        { new: true }
    );

    return res
        .status(201)
        .clearCookie("Accesstoken", options)
        .clearCookie("Refreshtoken", options)
        .json({ message: "logged out " });
});
const Driverdetails = asynchandler(async (req, res, next) => {
    const driver = await Driver.findById(req.user?._id).select(
        "-password -RefreshToken"
    );
    res.status(201).json({ driver });
});
const RefreshAccesstokens = asynchandler(async (req, res, next) => {
    // first of all check wether refresh axcces token  is there
    try {
        const incomingRefreshToken =
            req.cookie?.Refreshtoken || req.body.Refreshtoken;
        if (!incomingRefreshToken) {
            throw new ApiError(403, "token not found");
        }
        const decodedtoken = await jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        if (!decodedtoken) {
            throw new ApiError(403, "not able to decode");
        }
        const drivers = await Driver.findById(decodedtoken?._id);
        if (incomingRefreshToken !== drivers?.RefreshToken) {
            throw new ApiError(402, "tokens expired");
        }
        const { Accesstoken, Refreshtoken } = generateAcessandRefreshToken(
            drivers?._id
        );
        res
            .status(201)
            .cookie("Accesstoken", options)
            .cookie("Refreshtoken", options)
            .json({ Accesstoken, Refreshtoken });
    } catch (error) {
        console.log(error);
        throw new ApiError(404, " both tokens are expired");
    }
});

export { DriverRegister,loginDriver,logoutDriver,Driverdetails,RefreshAccesstokens, };
