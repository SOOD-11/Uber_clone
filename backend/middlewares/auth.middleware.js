import JWT from "jsonwebtoken";
import asynchandler from "../utilities/asynchandler.js";
import { User } from "../models/User.models.js";
import ApiError from "../utilities/ApiError.js";
import { Driver } from "../models/Driver.model.js";
export const VerifyJWT = asynchandler(async (req, res, next) => {
    try {
      // Extract token from cookies or headers
      const token = req.cookies?.Accesstoken || req.headers?.authorization?.replace("Bearer ", "");
  
      if (!token) throw new ApiError(401, "Unauthorized: Missing token");

      // Verify JWT
      const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);

      
  
      // Determine user type dynamically
      const userTypes = { User,Driver};
      let user = null;
  
      for (const [type, model] of Object.entries(userTypes)) {
        user = await model.findById(decodedToken?._id).select(" -refreshtoken");
        if (user) {
          req.user = user;
          req.userType = type;
          break;
        }
      }
  
      if (!user) throw new ApiError(403, "Unauthorized: User not found");
  
      next();
    } catch (error) {
      console.error("JWT verification error:", error);
      const statusCode = error.name === "JsonWebTokenError" ? 403 : 401;
      throw new ApiError(statusCode, "Unauthorized access");
    }
  });