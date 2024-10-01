import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    username:{
        type: String,
        required:[true,'username is required']
    },
    about:{
        type: String,
        required:[true,'please provide position']
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
    }

},{timestamps:true});

export default mongoose.model('profile', profileSchema);