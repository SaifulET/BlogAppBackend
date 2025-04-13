import express from "express"
import route from "./route/api.js";
import mongoose from "mongoose";
import {PORT,DATABASE} from "./src/config/config.js"
import cors from 'cors';
import bcrypt from 'bcrypt';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app=express();

app.use(
    cors({
      origin: "*", // ✅ Allows all origins
      methods: "GET,POST,PUT,DELETE", // ✅ Allow specific HTTP methods 
    })
  );

app.use(express.json());
app.use(cookieParser())


// app.use(helmet());
              


app.use("/images", express.static("../finalAssignment/public/images"));
app.use("/api/",route)
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//Database Connect
mongoose.connect(DATABASE,{autoIndex:true}).then(()=>{
    console.log("MongoDB connected");
}).catch(()=>{
    console.log("MongoDB disconnected");
})





app.listen(PORT,()=>{
    console.log("app run success at "+ PORT+" port");
})