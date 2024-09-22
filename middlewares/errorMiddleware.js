
const errorMiddleware =  (err,req,res,next) => {

    console.log(err);
    res.status(500).send({message:"error",err});

};

export default errorMiddleware;