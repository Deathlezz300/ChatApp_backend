import {Router} from 'express'
import { validarJWT } from '../Middlewares/valida-JWT';
import { AgregarMensaje, getChats } from '../Controllers/ChatController';
import { check } from 'express-validator';
import isDate from '../Helpers/isDate';

const ChatRouter=Router();

ChatRouter.use(validarJWT);

ChatRouter.get('/chats',getChats);

ChatRouter.post('/mensaje',
    [
        check('fecha','La fecha es obligatoria').custom(isDate),
        check('mensaje','El mensaje es obligatorio').not().isEmpty(),
        check('userTo','El uid del destinatario es obligatorio').not().isEmpty()
    ]
    ,AgregarMensaje);

export default ChatRouter;