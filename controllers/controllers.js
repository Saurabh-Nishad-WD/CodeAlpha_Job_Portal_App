import userModel from "../models/userModel.js";
// import bcryptjs from 'bcryptjs';

const register = async (req,res,next) =>{
    try{
        const {username,email,password,location} = req.body;
        const exists = await userModel.findOne({username});
        if(exists){
            // return res.status(501).send("user allredy exists,please login!");
            next("user allredy exists,please login!");
        }
        if(!username){
            // return res.status(501).send("username is required");
            next("username is required");

        }
        if(!email){
            // return res.status(501).send("email is required");
            next("email is required")

        }
        if(!password){
            // return res.status(501).send("password is required");
            next("password is required")
            
        }

        // var salt = bcryptjs.genSaltSync(8);
        // const hashPassword = await bcryptjs.hash(password,salt);


        const newUser = await userModel.create({
            username,
            email,
            password,
            location
        });

        res.status(200).send({
            message:"new user created",
            newUser
        })
    }
    catch(err){
        // res.send(err);
        next(err);
    }
}
export default register;