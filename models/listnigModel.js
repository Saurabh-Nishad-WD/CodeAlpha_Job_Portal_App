import mongoose from "mongoose";

const listningSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,'please provide user detail']
    },
    position:{
        type: String,
        required:[true,'please provide position'],
    },
    worktype:{
        type: String,
        enum:['full time','side hustel','intern'],
        required:[true,"please provide worktype"]
    },
    workExperience:{
        type: String,
        enum:['none','1-2 years','2-5 years','more than 5 years'],
        required:[true,"work experince in important"]
    },
    workLocation:{
        type: String,
        required:[true,"workLocation is required"]
    },
    resume:{
        type: String,
        required:[true,"resume is required"]
    },

},{timestamps:true});

export default mongoose.model('listing', listningSchema);