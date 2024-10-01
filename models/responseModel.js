import mongoose from "mongoose";

const statusSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,'please provide user detail']
    },
    status:{
        type: String,
        enum:['pending','procecing','accepted','rejected'],
        default:"pending",
        required:[true,'please provide staus'],
    }

},{timestamps:true});

export default mongoose.model('status', statusSchema);