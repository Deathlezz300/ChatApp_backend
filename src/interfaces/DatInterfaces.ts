import {Socket} from 'socket.io'; 
import { Request } from 'express';
import { ObjectId } from 'mongoose';

export interface Session{
    userId:string,
    socket:Socket
}

export interface MensajeRecibir{
    userIdTo?:string,
    fecha:string,
    mensaje:string,
    userFrom?:string
}

export interface MensajeEnviar{
    _id:string,
    mensaje:string,
    fecha:string,
    userOwner:string,
    userTo:string
}

export interface resToken{
    uid:string,
    name:string
}

export interface customRequest extends Request{
    uid?:string,
    name?:string
}

interface UserIn{
    _id:string,
    name:string,
}

export interface MensajeIN{
    _id:string | ObjectId,
    fecha:string,
    mensaje:string
}

export interface userMessageIn{
    user:UserIn,
    messages:any
}