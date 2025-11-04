const jwt = require("jsonwebtoken")
exports.authMiddleware=(req,res,next)=>
{
    const authHeader = req.headers["authorization"];
    //  const authHeader = req.headers['authorization'];
    
    if(!authHeader)
    {
        return res.status(401).json({msg:"no token found"})
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,paylaod)=>{
        if(err) {
            return res.status(403).json({message:"invalid token"})
        }
        req.user = paylaod
        next();
    })
}