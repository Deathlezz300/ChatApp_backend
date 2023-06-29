import {Response } from "express";
import jwt,{JwtPayload,Secret} from 'jsonwebtoken';
import { customRequest, resToken } from "../interfaces/DatInterfaces";

export const validarJWT=(req:customRequest,res:Response,next:Function)=>{
    
    const token=req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            message:'No hay un token a renvoar'
        })
    }

    try{

        const seed=process.env.SECRET_JWT_SEED as string;
        const{uid,name}=jwt.verify(token,seed) as JwtPayload;

        req.uid=uid;
        req.name=name;


    }catch(error){
        return res.status(401).json({
            ok:false,
            message:'Token no valido'
        })
    }

    next()


}