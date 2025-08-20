import chalk from "chalk";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import {morganMiddleware, systemLogs} from "./utils/Logger.js";
import connectDB from "./config/db.js";
import mongoSanitize from "express-mongo-sanitize";

await connectDB();
const app = express();

if(process.env.NODE_ENV === 'production'){
    app.use(morgan('dev'));
}

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(morganMiddleware)


app.get('/api/v1/test', (req, res)=>{
    res.json({message: "Hello invoice!"})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`${chalk.green.bold("✔")} 👍   Server is running ${chalk.yellow.bold(process.env.NODE_ENV)} mode on port ${chalk.blue.bold(PORT)}`);;
    systemLogs.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})