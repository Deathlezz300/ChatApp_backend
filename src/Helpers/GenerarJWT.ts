import jwt from 'jsonwebtoken';

export const generarJWT=(uid:string,name:string)=>{

    return new Promise((resolve,reject)=>{

        const payload={uid,name};

        const seed=process.env.SECRET_JWT_SEED as string;


        jwt.sign(payload,seed,{
            expiresIn:'24h'
        },(error,token)=>{

            if(error){
                console.log(error)
                reject('No se pudo generar el token');
            }

            resolve(token);
        });


    });
}
