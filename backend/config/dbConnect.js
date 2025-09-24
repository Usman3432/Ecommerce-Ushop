import mongoose from "mongoose";

export const dbConnection = () =>{
    let DB_URI=""
    if(process.env.NODE_ENV ==="DEVELOPMENT") DB_URI=process.env.DB_LOCAL_URI;
    if(process.env.NODE_ENV ==="PRODUCTION") DB_URI=process.env.DB_URI;
    mongoose.connect(DB_URI).then((con)=>{
        console.log(`MongoDB Database is connected to: ${con?.connection?.host}`)
    })
}