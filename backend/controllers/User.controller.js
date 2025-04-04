import asynchandler from "../utilities/asynchandler.js";
import { User } from "../models/User.models.js";
import { validationResult } from "express-validator";
import ApiError from "../utilities/ApiError.js";

const registerUser=asynchandler(async(req,res,next)=>{
  
const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
}

const {email,fullname,password}=req.body;
console.log(email);
if([email,fullname.firstname,password].some((superman)=>{
 return superman?.trim()===""})){
    throw new ApiError(401," fill all the credentials")
 }
 const existed=await  User.findOne(
    {email :req.body.email}
 )
 if(existed){
     throw new ApiError(401," user already exist");
 }
const user=  await User.create({
email,
fullname,
password



})


const  token=  await user.generateAuthtoken();
return res.status(200).json({user,token});

} );
export {
    registerUser
};