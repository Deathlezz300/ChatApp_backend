import {Request,Response} from 'express'
import { MensajeIN, customRequest, userMessageIn } from '../interfaces/DatInterfaces';
import Mensaje from '../models/MensajeModel';
import {Types} from 'mongoose'
import Usuario from '../models/UsusarioModel';
import { obtenerUsuariosYMensajes } from '../Helpers/OrdenarMessages';

const getChats=async(req:customRequest,res:Response)=>{
    try{

        const Usuarios=await Usuario.find({
            _id:{$ne:req.uid}
        }).select('-password -email');

        let MensajesFull=await obtenerUsuariosYMensajes(Usuarios,req.uid as string);
    
        res.status(200).json({
            ok:true,
            MensajesFull
        });


    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        });
    };
};

const AgregarMensaje=async(req:customRequest,res:Response)=>{

    const MensajeEnviar=new Mensaje(req.body);

    try{

        MensajeEnviar.userOwner=new Types.ObjectId(req.uid);

        const MensajeGuardado=await MensajeEnviar.save();

        res.status(201).json({
            ok:true,
            MensajeGuardado
        });

    
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }

}

export {
    getChats,
    AgregarMensaje
}