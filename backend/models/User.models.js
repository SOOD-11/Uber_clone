import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt  from "bcrypt";
const userSchema= new mongoose.Schema({
email:{
    type:String,
    require:true,
    unique:true,

},
fullname:{
    firstname:{
type:String,
required:true,
minlength:[4,'enter the firstname']
    },
    lastname:{
        type:String,    
    }
},
password:{
type:String,
required:true,

},
socketId:{

    type:String,
  
}



},{timestamps:true});

userSchema.pre("save", async function(next){

if(this.isModified("password")){
    this.password= await bcrypt.hash(this.password,12);


}



next();
})

userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateAuthtoken=  function(){
return jwt.sign({_id:this.id},process.env.JWT_SECRET,{expiresIn:process.env.expiryTime})
}

export const User=mongoose.model("User",userSchema);