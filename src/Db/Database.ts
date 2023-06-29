import mongoose from "mongoose";

const DbConnection=async()=>{
    try{
        await mongoose.connect(process.env.DBPW as string);

        console.log("conectado");

    }catch(error){
        console.log(error);
    }
}

export default DbConnection;