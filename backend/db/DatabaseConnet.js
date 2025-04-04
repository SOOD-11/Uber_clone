import mongoose from "mongoose";

const connectToDatabase=async()=>{
try {
    
     await mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.DB}`).then(()=>{



   
    
     
   
    console.log("database connected to ",process.env.PORT);
    })
    
} catch (error) {
    Console.log("database connection failed ");
    
}

}
export default connectToDatabase; 