import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const conn = async () =>{
    try {
        const mongoURI = process.env.MONGODB_URI;
        await mongoose.connect(mongoURI)
        console.log("Conexión exitosa a la base de datos");
    } catch (error) {
        console.log(error);
    }
}