import express from "express";
import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import cors from "cors";
const port= process.env.PORT || 9000
const server= http.createServer(app);



server.listen(port, ()=>{

console.log("successfully connected to port ",port);


});