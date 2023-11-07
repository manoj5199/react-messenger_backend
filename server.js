import express, { json } from "express";
import morgan from "morgan";
import cors from 'cors';
import dotenv from 'dotenv';
import { Connection } from "./database/db.js";
import router from "./routes/route.js";

const app = express();

app.use(morgan('dev'));
app.use(json());
app.use(cors('*'));
app.use(router);
dotenv.config();

app.get('/',(req,res)=>{
    res.send("Server is Running")
    console.log('server is running')
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`server is listening on port ${PORT}`)
    Connection();
})