// custom middleware
import jwt from 'jsonwebtoken';

export const auth_user=(req,res,next)=>{
    try{
    const token= req.header('x-auth-token');
    jwt.verify(token,process.env.USER_JWT_SECRET);
    console.log(token);
    next();
    }catch(err){
        res.send({err :err.message});
    }
}
export const auth_admin=(req,res,next)=>{
    try{
    const token= req.header('x-auth-token');
    jwt.verify(token,process.env.ADMIN_JWT_SECRET);
    console.log(token);
    next();
    }catch(err){
        res.send({err :err.message});
    }
}