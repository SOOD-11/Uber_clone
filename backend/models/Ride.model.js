import mongoose from 'mongoose';
const RideSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true


    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'



    },

    pickup: {

        type: String,
        required: true
    },
   destination:{

        type: String,
        required: true
    },
    fare:{

        type: Number,
        required: true


    },
    Otp:{
        type:String,
      
    },

    status:{

        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed'],
        default: 'pending',
    },

    distance: {

        type: Number

    },
    duration: {
        type: Number
    },
    paymentId: {

        type: String


    },
    orderId: {
        type: String


    },
    signatures: {

        type: String

    }






}, { timestamps: true })


export const  Ride=mongoose.model("Ride",RideSchema);

