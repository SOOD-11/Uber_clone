import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,

    },
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [4, 'enter the firstname']
        },
        lastname: {
            type: String,
        }
    },
    password: {
        type: String,
        required: true,

    },
    RefreshToken: {
        type: String,
    },
    socketId: {

        type: String,

    }



}, { timestamps: true });

userSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }



    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}


userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ _id: this.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this.id, email: this.email, firstname: this.fullname.firstname }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
}

export const User = mongoose.model("User", userSchema);