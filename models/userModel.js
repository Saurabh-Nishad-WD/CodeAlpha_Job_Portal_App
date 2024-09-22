import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

const userSchema = mongoose.Schema({
    username:{
        type: String,
        unique:true,
        required:[true,'username is required']
    },
    email:{
        type: String,
        required:[true,'email is required'],
        // validate:validator.isEmail,
    },
    password:{
        type: String,
        required:[true,'password is required'],
    },
    location:{
        type: String,
        default:'india'
    }
},{timestamps:true});

userSchema.pre("save",async function() {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password,salt);
});

export default mongoose.model('user', userSchema);