import {Request,Response} from 'express';
import { generarJWT } from '../Helpers/GenerarJWT';
import { customRequest } from '../interfaces/DatInterfaces';
import Usuario from '../models/UsusarioModel';
import bcrypt from 'bcryptjs';

const LoginUsuario=async(req:Request,res:Response)=>{

    try{

        const {email,password}=req.body;

        let UsuarioDuplicado=await Usuario.findOne({email});

        if(!UsuarioDuplicado){
            return res.status(400).json({
                ok:false,
                message:'No existe este usuario'
            })
        };

        const ValidarPassword=bcrypt.compareSync(password,UsuarioDuplicado.password);

        if(!ValidarPassword){
            return res.status(400).json({
                ok:false,
                message:'Credenciales incorrectas'
            });
        };

        const token=await generarJWT(UsuarioDuplicado.id,UsuarioDuplicado.name);

        res.status(200).json({
            ok:true,
            uid:UsuarioDuplicado.id,
            name:UsuarioDuplicado.name,
            token
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            message:'Ha ocurrido un error'
        })
    }

}


const CrearUsuario=async(req:Request,res:Response)=>{

    
    const {email,password}=req.body;
    try{

        let usuarioDuplicado= await Usuario.findOne({email})

        if(usuarioDuplicado){
            return res.status(400).json({
                ok:false,
                message:'Un usuario existe con este correo'
            })
        } 

        const usuario=new Usuario(req.body);

        //Encriptar contraseña

        const salt=bcrypt.genSaltSync();

        usuario.password=bcrypt.hashSync(password,salt);

        await usuario.save();

        //Generar JWT

        const token=await generarJWT(usuario.id,usuario.name);

        res.status(201).json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token
        })

    }catch(error){
        res.status(500).json({
            ok:false,
            message:'Por favor hable con el administrador'
        })
    };

};

const RenewToken=async(req:customRequest,res:Response)=>{
    
    const uid=req.uid as string;
    const name=req.name as string;

    const token=await generarJWT(uid,name);

    res.json({
        ok:true,
        uid,
        name,
        token
    })
}

export {
    LoginUsuario,
    RenewToken,
    CrearUsuario
}