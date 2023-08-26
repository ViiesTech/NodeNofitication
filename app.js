import express,{json} from "express";
import connectDB from "./config/connectDB.js";
import { initializeApp, applicationDefault} from "firebase-admin/app";
import {getMessaging} from 'firebase-admin/messaging'
// import cors from 'cors'
import admin from 'firebase-admin'
process.env.GOOGLE_APPLICATION_CREDENTIALS


import jsonFile from './jpguide-69169-firebase-adminsdk-plbpy-2b1ac87c0b.json'
connectDB()

const app = express()
app.use(express.json())
// app.use(
//     cors({
//         origin: "*"
//     })
// )

// app.use(
//     cors({
//         methods: ["GET", "POST", "DELETE", "PUT", "UPDATE", "PATCH"],
//     })
// )


app.get("/", (req, res)=>{
    res.send("Working")
})


initializeApp({
    credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS        ),
    projectId:'jpguide-69169'
})


app.post('/sendNotifications', (req, res)=>{
    const recviceToken = req.body.fcmTokem;
    const NotificationMessage = req.body.message;

    const message ={
        notification:{
            title: "Jp Guide",
            body : NotificationMessage
        },
        token: recviceToken
    }

    getMessaging()
    .send(message)
    .then((response)=> {
        res.status(200).json({
            message: "Successfully sent message",
            token : recviceToken
        })
        console.log("Successfully sent message: ", response)
    }).catch((error)=>{
        res.status(401)
        res.send(error)
        console.log("Error sent message: ", error)
    })
})





app.listen(8000, ()=>{
    console.log("listening on " + 8000)
})