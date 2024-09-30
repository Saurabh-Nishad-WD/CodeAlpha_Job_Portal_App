import userModel from "../models/userModel.js";

export const register = async (req,res,next) =>{
    try{
        const {username,email,password,location} = req.body;
        if(!username || !email ||!password){

            return next("please provide all mendetory field")
        }
        const exists = await userModel.findOne({email});
        if(exists){
          return  next("user allredy exists,please login!");
    }

      

        const newUser = new userModel({
            username,
            email,
            password,
            location
        });

        await newUser.save();

        res.status(200).send({
            message:"new user created",
            newUser,
        })
}
    catch(err){
        return next(err);
   }
}

export const login = async (req,res,next) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
           return next("please provide all mendetory");
        }
        const loginUser = await userModel.findOne({email});

        if(!loginUser){
           return next("user not found");
        }
       
        const isMatch =await loginUser.matchPassword(password);
        if(!isMatch){
          return next("wrong email or password");
        }

        const token = loginUser.createJWT();


        res.status(200).send({
            message:"successfully login",
            token,
            loginUser
        })

    }
    
    catch(err){
       next("user login failed");
     }
 }

 export default {register, login}