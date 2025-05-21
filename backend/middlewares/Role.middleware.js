import ApiError from "../utilities/ApiError.js";
import asynchandler from "../utilities/asynchandler.js";

const authorizeRole=(...roles)=>asynchandler((req,res,next)=>{
    if(!req.user?.role){
throw new ApiError(401,"Unauthorized error:No roles assigned");
    }
    if(!roles.includes(req.user.role)){
        throw new ApiError(403,`Access denied:Role ${req.user.role}`)
    }


next();


})
export default authorizeRole;