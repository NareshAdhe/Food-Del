import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"});
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {authMiddleware}