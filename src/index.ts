import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

// by using oly import we can find teh types , do not use require file 
//Could not find a declaration file for module 'express'. 
// add .d.ts file that defines the types 
// this is the library that does not have typescript
// we can use @ ts-ignore -> just remove the error  -> but not suggested to do so .
// express is written in js not typescript .
// to remove the error -> npm install -d @types/ express
/**
 git init 
 git add .
 git commit -m ""
 git add origin main url 
 git push origin main 
 */
const app = express();

app.post("/api/v1/signup" , (req, res)=>{

})

app.post("/api/v1/signin" , (req, res)=>{
    
})


app.post("/api/v1/content" , (req, res)=>{
    
})

app.get("/api/v1/content" , (req, res)=>{
    
})

app.delete("/api/v1/content" , (req, res)=>{
    
})


app.post("/api/v1/brain/share" , (req, res)=>{
    
})


app.get("/api/v1/brain/:shareLink" , (req, res)=>{
    
})