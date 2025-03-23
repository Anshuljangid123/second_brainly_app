import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { ContentModel, UserModel } from "./db";
import { JWT_PASSWROD } from "./config";
import { userMiddleware } from "./middleware";

// by using oly import we can find teh types , do not use require file 
//Could not find a declaration file for module 'express'. 
// add .d.ts file that defines the types 
// this is the library that does not have typescript
// we can use @ ts-ignore -> just remove the error  -> but not suggested to do so .
// express is written in js not typescript .
// to remove the error -> npm install -d @types/ express
const app = express();
app.use(express.json());

app.post("/api/v1/signup" , async (req, res)=>{
    // zod validation  , hash the password 
    const username = req.body.username ;
    const password = req.body.password;

    try{
        await UserModel.create({
            username : username ,
            password : password 
        })
    
        res.json({
            message : "user signed up "
        })
    }
    catch(error){
        res.status(411).json({
            message : "user already exist ."
        })
    }
})

app.post("/api/v1/signin" , async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const existingUser =await UserModel.findOne({
        username , 
        password 
    })
    if(existingUser){
        const token = jwt.sign({
            id : existingUser._id // payloads 
        },JWT_PASSWROD)
        res.json({
            token
        })
    }
    else{
        res.status(403).json({
            message : "incorrect credentials ."
        })
    }
})
/**
 "username" : "anshullkjgh",
    "password" : "123123"  
 */

app.post("/api/v1/content" , userMiddleware , async  (req, res)=>{
    const link = req.body.link ;
    const type = req.body.type;

    await ContentModel.create({
        link , 
        type , 
        // @ts-ignore
        userId : req.userId ,
        tags : []
    })
    res.json({
        message : "content added"
    })
})

app.get("/api/v1/content" , userMiddleware ,async (req, res)=>{
    //@ts-ignore
    const userId = req.userId;
    try{
        const content = await ContentModel.find({
            userId : userId
        }).populate("userId" , "username")

        res.json({
            content
        })
    }catch(error){
        res.status(500).json({
            message : `error in fetcing data ${error}`
        });
    }
})

app.delete("/api/v1/content", userMiddleware , async (req, res)=>{
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({
        contentId , 
        //@ts-ignore
        userId : req.userId 
    })
    res.json(
        {message : "Deleted "}
    )
})


app.post("/api/v1/brain/share" , (req, res)=>{
    
})


app.get("/api/v1/brain/:shareLink" , (req, res)=>{
    
})

app.listen(3000 , () => "listning on port 3000")