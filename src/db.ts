
import {model , Schema} from "mongoose";
import mongoose from "mongoose";
import { JWT_PASSWROD } from "./config.ts";
mongoose.connect("mongodb+srv://anshuljan2003:l0miV1lDK9OpBmOS@cluster0.jwz66.mongodb.net/brainly")

const UserSchema = new Schema ({
    username : {type : String , unique : true},
    password : String
})

export const UserModel = model("User" , UserSchema);

const ContentSchema = new Schema({
    title : String , 
    link  : String , 
    tags : [{type : mongoose.Types.ObjectId , ref : "Tag"}],
    userId : {type: mongoose.Types.ObjectId , ref : "User" , required : true}
})

export const ContentModel = model("Content" , ContentSchema);
