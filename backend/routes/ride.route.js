import express from "express";
import { query,body } from "express-validator";
import { Router } from "express";
import { VerifyJWT } from "../middlewares/auth.middleware.js";
import { Rides, startRide } from "../controllers/ride.controller.js";
import { getFares } from "../controllers/ride.controller.js";
import { acceptride } from "../controllers/ride.controller.js";
const rideRoute= Router();
rideRoute.post('/ride-created',
   VerifyJWT, 
   [

body('pickup').isLength({min:3}).withMessage(" Pickup address should be greater than 3 letters"),
body('destination').isLength({min:3}).withMessage(" Pickup address should be greater than 3 letters"),
body('vehicleType').isIn(["Auto","Bike","Car"]).withMessage("Invalid Vehicle Type")


],Rides);


rideRoute.get('/get-fare',
   
   [

query('pickup').isLength({min:3}).withMessage(" Pickup address should be greater than 3 letters"),
query('destination').isLength({min:3}).withMessage(" Pickup address should be greater than 3 letters"),



],getFares);



rideRoute.post('/ride-accepted',
   VerifyJWT,
   [
body('rideId').isMongoId().withMessage('Invalid ride id')
],acceptride);
rideRoute.post('/ride-start',
   VerifyJWT,
 [
body('rideId').isMongoId().withMessage('Invalid ride id'),
body('otp').isString().withMessage("OTP fill to confirm and start"),
],startRide);
export default rideRoute;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2ZlYWU1ZTc0ZTI4Nzc5Njg1ODE2OGMiLCJyb2xlIjoiVXNlciIsImlhdCI6MTc1Mzk3NTI1MiwiZXhwIjoxNzU0MDYxNjUyfQ.YOCTOBOFBV1d817wTM6R9mTB1t5lbGz_dVz9IUC3PUw",