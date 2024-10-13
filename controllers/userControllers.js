import jobModel from "../models/jobModel.js";
import listnigModel from "../models/listnigModel.js";
import profileModel from "../models/profileModel.js";
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
            const {password,username,email,newPassword,location} = req.body;
    
            if(!password){
              return next("please provide password");
               }


               const user = await userModel.findOne({_id:req.body.id});

               const isMatch = await user.matchPassword(password);
    
            //    const isMatch =  await bcryptjs.compare(password,user.password);
               
            if(!isMatch){
              return res.status(500).send({
                  message:"Un-Authorised access"
              });
             }
    
               if(!email && !newPassword && !location && !username){
               return next("nothing changed");
               }           
    
            if(username){
                return next("username can't change once created");
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


    export const deleteUser = async (req,res,next) => {
        try{
    
            const user = await userModel.findByIdAndDelete(req.body.id);
            if(!user){
                return next("no user available");
            }
    
            res.status(200).send({
                message:"user deleted",
            });
    
        }
        
        catch(err){
           return next("user deleting error");
         }
     }

    export const getJob = async (req,res,next) => {
        try{
    
            const jobs = await jobModel.find({});
            if(!jobs){
                return next("currently no jobs available");
            }
    
            res.status(200).send({
                message:`total ${jobs.length} found`,
                jobs
            });
    
        }
        
        catch(err){
           return next("job getting error");
         }
     }
    export const getCompanyJob = async (req,res,next) => {
        try{
    
            const job = await jobModel.find({company:req.params.company});
            if(!job){
                return next(`currently no job available in ${company}`);
            }
    
            res.status(200).send({
                message:`total ${job.length} found`,
                job
            });
    
        }
        
        catch(err){
           return next("job getting error");
         }
     }


    export const createProfile = async (req,res,next) => {
        try{
    
            const user = await userModel.findOne({_id:req.body.id});
            if(!user){
                return next("no user available");
            }
            const exist = await profileModel.findOne({username:user.username});
            if(exist){
                return next("profile allready exists, You can update/change it")
            }
            
            
            const {about,worktype,workExperience,workLocation} = req.body;
            if(!about || !worktype|| !workExperience || !workLocation){
                return next("please provide all mendetory field");
            }
            
            const newProfile = new profileModel({
                username:user.username,
                about,
                worktype,
                workExperience,
                workLocation
            });
            
            await newProfile.save();
            
            res.status(200).send({
                message:`profile successfuly created`,
                newProfile
            });
            
        }
        
        catch(err){
           return next("profile getting error");
         }
     }


    export const apply = async (req,res,next) => {
        try{
            
            const user = await userModel.findOne({_id:req.body.id});
            if(!user){
                return next("Un-Authorised request");
            }
            const profile = await profileModel.findOne({username:user.username});
            if(!profile){
                return next("profile not fetched");
            }
            
            const {position,isProfile,resume} = req.body;
            
            if(!position || !resume ||!isProfile){
                return next("please provide all mendetory field");
            }
            
            if(isProfile == false){
                return next("please first make your profile in the app");
            }

             const apply = new listnigModel({
                profile:profile,
                position,
                worktype:profile.worktype,
                workExperience:profile.workExperience,
                workLocation:profile.workLocation,
                resume
             });

             await apply.save();


            res.status(200).send({
                message:`successfuly applied`,
                profile,
                position:apply.position,
                resume:apply.resume,
                date:Date.now()
            });
    
        }
        
        catch(err){
           return next("job apply error");
         }
     }

 export default {get,update,getJob,getCompanyJob,createProfile,apply}