
import { Router } from "express";
import { registerUser } from "../controllers/User.controller.js";
import {body} from "express-validator";
const router= Router();
router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name should be there in the link'),
    body('password').isLength({min:8}).withMessage('pssword must be atleast 8 chracters long').matches(/[A-Z]/).withMessage('pasword must have atleast one uppercase')
    .matches(/[a-z]/).withMessage('paswword must contains atleast one lowercase letter')
    .matches(/[0-9]/).withMessage('password must be atleast one number')]
,registerUser);



export default  router;

