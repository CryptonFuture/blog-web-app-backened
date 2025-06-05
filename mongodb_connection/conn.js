import mongoose from "mongoose";

// import { mongodb_url } from '../config'

const DB = 'mongodb+srv://admim:LelyTJKimfIIFaDw@cluster0.7dfpd9x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectMongoDb = async () => {
    try {
        const conn = await mongoose.connect(DB, {})
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
         console.error(`MongoDB connection error: ${error.message}`);
         process.exit(1)
    } 
}

export {connectMongoDb}

