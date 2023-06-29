import Mensaje from "../models/MensajeModel";
import {Document, ObjectId} from 'mongoose';

interface UsuarioIn{
    name:string;
    _id:string | ObjectId;
}

export const obtenerUsuariosYMensajes = (Usuarios:any,uid:string): Promise<any[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const UsuariosTodo = [];
        for (const user of Usuarios) {
          const Messages = await Mensaje.find({
            $or: [
              { userOwner: uid, userTo: user._id },
              { userTo: uid, userOwner: user._id }
            ]
          }).select('_id fecha mensaje userOwner').lean();
  
          const MessagesFull = Messages.map(me => {
            return {
              _id: me._id.toString(),
              mensaje: me.mensaje,
              fecha: me.fecha,
              userOwner:me.userOwner,
              userTo:me.userTo
            };
          });
  
          UsuariosTodo.push({
            user: { _id: user._id?.toString(), name: user.name, messages: MessagesFull }
          });
        }
        resolve(UsuariosTodo);
      } catch (error) {
        reject(error);
      }
    });
  };