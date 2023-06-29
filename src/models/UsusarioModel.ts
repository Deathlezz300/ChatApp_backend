import {Schema,model} from 'mongoose';

const UsuarioSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const Usuario=model('Usuario',UsuarioSchema);

export default Usuario;