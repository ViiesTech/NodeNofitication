import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/Notification")
    
    const db = mongoose.connection
    db.on("error", err => console.log(err))
    db.once("open",()=>console.log("DB Connected"));
}

export default connectDB