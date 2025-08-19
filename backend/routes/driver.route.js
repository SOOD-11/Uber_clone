
import { Router } from "express";
import { body } from "express-validator";
import { VerifyJWT } from "../middlewares/auth.middleware.js";

import { Driverdetails, DriverRegister, loginDriver, logoutDriver, RefreshAccesstokens ,} from "../controllers/driver.controller.js";
import authorizeRole from "../middlewares/Role.middleware.js";
const DriverRoute=Router();

DriverRoute.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:8}).matches(/[A-Z]/).withMessage('Atleast 1 uppercase letters').matches(/[a-z]/).withMessage('Atleast 1 lowercase letter').matches(/[0-9]/).withMessage('atleast a number'),
    body('fullname.firstname').isLength({min:3}).withMessage('ATLEAST 3 LETTERS'),
    body('fullname.lastname').isLength({min:3}).withMessage('Atleast 3 chracters'),
    body('VehicleDetails.vehicletype').isIn(['Car','Bike','Auto']).withMessage('Atleast select proper type'),
    body('VehicleDetails.plate')
    .customSanitizer(value => value?.replace(/\s+/g, '').toUpperCase()) // remove all spaces and uppercase
    .matches(/^[A-Z]{2}[0-9]{2}[A-Z]{0,2}[0-9]{4}$/)
    .withMessage('Invalid vehicle number plate format')
],DriverRegister);


DriverRoute.post('/login',[
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min:8}).withMessage('password should be Atleast 8 chracters long').matches(/[a-z]/).withMessage('password should have atleast a lowercase letter').matches(/[A-Z]/).withMessage('password should have atleast 1 uppercase letter')
    .matches(/[0-9]/).withMessage('it should have atleast a one number')
],loginDriver)
DriverRoute.post('/logout',VerifyJWT,logoutDriver)
DriverRoute.get('/get-Driver',VerifyJWT,Driverdetails);
DriverRoute.post('/refreshtoken',RefreshAccesstokens);










export default DriverRoute;