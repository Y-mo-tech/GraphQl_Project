import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
   try{
      await mongoose.connect('mongodb://localhost:27017/User')
      console.log("MongoDB connected...");
   } catch(err){
      console.error("Database connection error:", err);
   }
}