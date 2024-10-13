import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jobSchema = mongoose.Schema({
    company:{
        type: String,
        required:[true,'please provide company name']
    },
    position:{
        type: String,
        required:[true,'please provide position'],
    },
    status:{
        type: String,
        enum:['apply','pending','interview','reject'],
        default:"apply",
        required:[true,'please provide status'],
    },
    worktype:{
        type: String,
        enum:['full time','side hustel','intern'],
        required:[true,"please provide worktype"]
    },
    workLocation:{
        type: String,
        required:[true,"workLocation is required"]
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true});


export default mongoose.model('job', jobSchema);