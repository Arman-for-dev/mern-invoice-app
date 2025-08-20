import chalk from "chalk";
import mongoose from "mongoose";
import { systemLogs } from "../utils/Logger.js";


const connectDB = async () =>{
    try {
        const connect  = mongoose.connect(process.env.MONGO_URI)
        console.log('Database connected')
        // console.log(`${chalk.blue.bold(`MongoDB Connected: ${(await connect).Collection.host}`)}`);
        systemLogs.info(`Mongodb Connected`);
    } catch (error) {
        console.error(`${chalk.red.bold(`Error: ${error.message}`)}`);
        process.exit(1);
    }
}

export default connectDB;