import jobModel from "../models/jobModel.js";
import userModel from "../models/userModel.js";

export const create = async (req,res,next) => {
    try{

        const user = await userModel.findOne({_id:req.body.id});
        if(!user){
           return next("Un-Authorised request");
        }

        const{company,position,status,worktype,workLocation,createdBy} = req.body;

        if(!company || !position ||!status || !worktype || !workLocation ||!createdBy){

            return next("please provide all mendetory field")
        }

        const exist = await jobModel.findOne({company,position,status,worktype,workLocation,createdBy});
        if(exist){
            return next("job seems to be allready exists, Please confirm or recheck");
        }

        const job = new jobModel({
            company,
            position,
            status,
            worktype,
            workLocation,
            createdBy
        });

        await job.save();

        res.status(200).send({
            message:"job successfuly created",
            job
        });

    }
    
    catch(err){
       return next("getting request failed");
     }
 }
export const getAllJob = async (req,res,next) => {
    try{

        const jobs = await jobModel.find({createdBy:req.body.id});
        if(!jobs){
           return next("no jobs available");
        }

        res.status(200).send({
            message:`total ${jobs.length} available`,
            jobs
        });

    }
    
    catch(err){
       return next("jobs getting error");
     }
 }
export const getJob = async (req,res,next) => {
    try{

        const job = await jobModel.findOne({createdBy:req.body.id,_id:req.params.id});

        if(!job){
           return next("no jobs available");
        }

        res.status(200).send({
            message:`job is available`,
            job
        });

    }
    
    catch(err){
       return next("jobs getting error");
     }
 }
export const update = async (req,res,next) => {
    try{

        const user = await userModel.findOne({_id:req.body.id});

        if(!user){
           return next("somthing went wrong please retry");
        }

        const{password} = req.body;

        if(!password){

            return next("user password is required to update the job details")
        }
        console.log("1");

        const isMatch =await user.matchPassword(password);
        if(!isMatch){
          return next("wrong email or password");
        }


        const job = await jobModel.findOne({createdBy:req.body.id,_id:req.params.id});
        if(!job){
            return next("no jobs available");
        }
        
        const{company,position,status,worktype,workLocation} = req.body;

        if(company) job.company = company;
        if(position) job.position = position;
        if(status) job.status = status;
        if(worktype) job.worktype = worktype;
        if(workLocation) job.workLocation = workLocation;


        await job.save();


        res.status(200).send({
            message:`job updation successfull`,
            job
        });

    }
    
    catch(err){
       return next("job updation error");
     }
 }
export const deleteJob = async (req,res,next) => {
    try{

        const job = await jobModel.findOneAndDelete({createdBy:req.body.id,_id:req.params.id});
        if(!job){
            return next("no job available");
        }

        res.status(200).send({
            message:"job deleted",
        });

    }
    
    catch(err){
       return next("jobs deleting error");
     }
 }

 export default {create,getAllJob,getJob,deleteJob};