import express,{Application} from 'express';
import cors from 'cors';
import http from 'http';
import UserRouter from './Router/UserRouter';
import dotenv from 'dotenv';
import ChatRouter from './Router/ChatRouter';

export class Server{

    private app:Application;
    public server;
    private puerto:string;

    constructor(){
        this.app=express();
        this.server=http.createServer(this.app);
        this.puerto=process.env.PORT || '8000';
        this.listen();
        dotenv.config()
        this.app.use(cors());
        this.app.use(express.json());
        this.Routes();
    }

    listen(){
        this.server.listen(this.puerto,()=>console.log(`Servidor corriendo en el puerto ${this.puerto}`));
    }

    Routes(){
        this.app.use('/api',UserRouter);
        this.app.use('/api',ChatRouter);
    }

}