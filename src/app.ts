import DbConnection from "./Db/Database";
import { Server_socket } from "./Server_socket";
import { Server } from "./server";
const servidor=new Server();

const Servidor_Socket=new Server_socket(servidor.server);

DbConnection();

