import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
    username:{
        type: String,
        unique:true,
        required:[true,'username is required']
    },
    email:{
        type: String,
        required:[true,'email is required'],
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

userSchema.methods.createJWT =  function(){
    return jwt.sign({id:this._id},process.env.jwt_key,{expiresIn:"1d"});
}
userSchema.methods.matchPassword =  async function(password){

const isMatch = await bcryptjs.compare(password,this.password);
return isMatch;
}
export default mongoose.model('user', userSchema);