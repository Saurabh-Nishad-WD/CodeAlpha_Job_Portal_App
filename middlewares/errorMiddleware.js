
const errorMiddleware =  (err,req,res,next) => {

        res.status(500).send({
        Message:"error",
        error:err
    });

};

export default errorMiddleware;