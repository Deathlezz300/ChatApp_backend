import {Router} from 'express';
import { CrearUsuario, LoginUsuario, RenewToken } from '../Controllers/UserController';
import { validarJWT } from '../Middlewares/valida-JWT';
import {check} from 'express-validator';
import { validarCampos } from '../Middlewares/validarCampos';

const UserRouter=Router();


UserRouter.post('/login',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','La contraseña debe tener mas de 6 caracteres').isLength({min:6}),
        validarCampos
    ]
,LoginUsuario);


UserRouter.get('/renovar',validarJWT,RenewToken);

UserRouter.post('/registrar',

    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','La contraseña debe tener mas de 6 caracteres').isLength({min:6}),
        validarCampos
    ]
,CrearUsuario);

export default UserRouter;