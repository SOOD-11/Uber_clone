import { Router } from "express";
import {body} from "express-validator";
import { distancetime, mapcontrols,suggestions } from "../controllers/map.controller.js";
import { query } from "express-validator";
const Maproute= Router();


Maproute.post('/getcordinates',[
body('address').isLength({min:3}).withMessage('the address should be greater than 3 letters ')
],mapcontrols);
Maproute.get('/get-Distance-Time',[
query('pickupaddress').isLength({min:3}).withMessage('the address should be greater than 3 letters ')
,query('dropaddress').isLength({min:3}).withMessage('the address should be greater than 3 letters ')


],distancetime);
Maproute.get('/get-suggestions',[
    query('address').isLength({min:3}).withMessage('the address should be greater than 3 letters ')
],suggestions);

export default Maproute;