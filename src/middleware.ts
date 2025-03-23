import { NextFunction } from "connect";
import {Request , Response} from "express";

import jwt from "jsonwebtoken";
import { JWT_PASSWROD } from "./config";

export const userMiddleware =  (req : Request , res: Response, next :  NextFunction) =>{
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, JWT_PASSWROD );

    if(decoded){
        // @ts-ignore
        req.userId = decoded.id;
        // we are needed to override the types of express request object.
        next();
    }else{
        res.status(403).json({
            message : "you are not logged in "
        })
    }
}