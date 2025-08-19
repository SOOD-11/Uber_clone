import mongoose from "mongoose";
import bcrypt from  "bcrypt";
import jwt from "jsonwebtoken";


const driverSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,


    },
    fullname: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
    },
        status: {
            type: String,
            enum: ['isActive', 'notActive'],
            default: 'notActive'
        },
        VehicleDetails: {
            vehicletype: {
                type: String,
                enum: ['Car', 'Bike', 'Auto'],
                default:'Car'
            },
            vehiclename: {
                type: String,
                required: true,
            },
            Capacity:{
                type:Number,
                required:true,
            },
            plate:{
type:String,
required:true
            },
        },
            socketId: {
                type: String,
                
            },
            location: {

                ltd: {
                    type: Number,
                

                },
                lng: {
                    type: Number,
                   

                }

            },
            RefreshToken:{
                type:String,
                
            },
            role: {
                type: String,
                enum: ['Driver'],
                default: 'Driver',
              }


        }, { timestamps: true })
       driverSchema.pre("save", async function (next) {
       
           if (this.isModified("password")) {
               this.password = await bcrypt.hash(this.password, 12);
       
       
           }
       
       
       
           next();
       })
       
       driverSchema.methods.isPasswordCorrect = async function (password) {
           return await bcrypt.compare(password, this.password);
       }
       
     
       driverSchema.methods.generateAccessToken = function () {
           return jwt.sign({ _id: this.id,role: this.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
           )
       }
       driverSchema.methods.generateRefreshToken = function () {
           return jwt.sign({ _id: this.id, email: this.email, firstname: this.fullname.firstname }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
           )
       }
       
       export const Driver = mongoose.model("Driver", driverSchema);