import {Schema,model} from 'mongoose'

const MensajeSchema=new Schema({
    fecha:{
        type:Date,
        required:true
    },
    mensaje:{
        type:String,
        required:true
    },
    userTo:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    userOwner:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
});

const Mensaje=model('Mensaje',MensajeSchema);

export default Mensaje;