import mongoose from "mongoose";

const connectDb = async(req,res) =>{
    try{
       await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongo server ${mongoose.connection.host}`)
    }
    catch(err){
        res.send(err);
    }
}

export default connectDb;