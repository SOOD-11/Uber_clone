import express from "express";
import cors from "cors";
import connectToDatabase from "./db/DatabaseConnet.js";
import dotenv from "dotenv";
import { configDotenv } from "dotenv";
import userrouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app=express();
configDotenv();
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))
app.use(cookieParser());
connectToDatabase();

app.get('/', (req,res)=>{
  res.send("hello world i am on the top");  
})
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1/user",userrouter);
export default app;