
import { Router } from "express";
import { loginUser, logout, refreshAccesstokens, registerUser, Userdetails } from "../controllers/User.controller.js";
import {body} from "express-validator";
import { VerifyJWT } from "../middlewares/auth.middleware.js";
import authorizeRole from "../middlewares/Role.middleware.js";
const router= Router();
router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name should be long'),
    body('password').isLength({min:8}).withMessage('pssword must be atleast 8 chracters long').matches(/[A-Z]/).withMessage('pasword must have atleast one uppercase')
    .matches(/[a-z]/).withMessage('paswword must contains atleast one lowercase letter')
    .matches(/[0-9]/).withMessage('password must be atleast one number')]
,registerUser);

router.post('/login',[
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min:8}).withMessage('password should be Atleast 8 chracters long').matches(/[a-z]/).withMessage('password should have atleast a lowercase letter').matches(/[A-Z]/).withMessage('password should have atleast 1 uppercase letter')
    .matches(/[0-9]/).withMessage('it should have atleast a one number')
],loginUser)
router.post('/logout',VerifyJWT,logout);
router.get('/get-user',VerifyJWT,Userdetails);
router.post('/refreshtoken',refreshAccesstokens);
export default  router;

