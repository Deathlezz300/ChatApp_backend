import {Socket,Server as WebSocketServer} from 'socket.io';
import { MensajeEnviar, MensajeRecibir, Session } from './interfaces/DatInterfaces';
import {Request} from 'express'

export class Server_socket{
    
    private socket:WebSocketServer;
    private sessions:Session[];

    constructor(server:any){
        this.sessions=[] as Session[];
        this.socket=new WebSocketServer(server,{
            cors:{
                origin:"*"
            }
        });
        this.RutasConnection();
    }

    RutasConnection(){
        this.socket.on('connection',(Wsocket:Socket)=>{


            const {userid:userID}=Wsocket.request.headers;



            if(userID && !this.sessions.some(ses=>ses.userId==userID)){
                this.sessions.push({
                    userId:userID as string,
                    socket:Wsocket
                });

                console.log(this.sessions);
            }else{
                this.sessions=this.sessions.map(ses=>{
                    if(ses.userId===userID){
                        return{
                            ...ses,
                            socket:Wsocket
                        }
                    }
                    return ses;
                })
            };


            Wsocket.on('message',(message:MensajeEnviar)=>{
                const userTo=this.sessions.find(ses=>{
                    return ses.userId==message.userTo;
                });
                if(userTo){
                    console.log('voy a enviar');
                    userTo.socket.emit('nuevo_mensaje',message);
                }
            });

            Wsocket.on('disconnect',()=>{
                this.sessions=this.sessions.filter(ses=>{
                    return ses.userId!=userID;
                })

                console.log(this.sessions);

            });
            
            
        })
    }

    

}