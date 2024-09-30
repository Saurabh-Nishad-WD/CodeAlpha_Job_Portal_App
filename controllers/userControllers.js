import userModel from "../models/userModel.js";

export const get = async (req,res,next) => {
    try{

        const user = await userModel.findOne({_id:req.body.id});
        if(!user){
           return next("Un-Authorised request");
        }

        res.status(200).send({
            message:"user found",
            user
        })

    }
    
    catch(err){
       next("getting request failed");
     }
 }
export const update = async (req,res,next) => {
        try{
            const {password,email,newPassword,location} = req.body;
    
            if(!password){
              return next("please provide password");
               }


               const user = await userModel.findOne({_id:req.body.id});

               const isMatch = await user.matchPassword(password);
    
            //    const isMatch =  await bcryptjs.compare(password,user.password);
               
            // if(!isMatch){
            //   return res.status(500).send({
            //       message:"Un-Authorised access"
            //   });
            //  }
    
               if(!email && !newPassword && !location){
               return next("nothing changed");
               }           
    
            if(email){
                user.email = email;
               }
            if(newPassword){
    
                const salt = bcryptjs.genSaltSync(10)
                const hashPassword = await bcryptjs.hash(newPassword,salt);
    
                user.password = hashPassword;
    
               }
            if(location){
                user.location = location;
               }
    
               await user.save();
         
          
            res.status(200).send({
                message:"user updated",
                user
            })
    
        }
        catch(err){
            res.status(500).send({
                message:"user updation error",
                err
            });
        }
    }

 export default {get,update}