import jwt from 'jsonwebtoken';
const authMiddleware =  (req,res,next) =>{
    try{

        const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send({
        message: "Authorization header is missing",
      });
    }
        
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "Token is missing",
      });
    }

         jwt.verify(token,process.env.jwt_key,(err,decode) => {
            if(err){
               return res.status(500).send({
                    message:"token expires!, Please login again",
                });
            }
            else{
                req.body.id = decode.id;
                next();
            }
        })

    }
    catch(err){
        res.status(500).send({
            message:"error middleware",
            err
        });
    }
}

export default authMiddleware;
