const jwt =require('jsonwebtoken')
require('dotenv').config();
const loginPage =(req,res) =>{
    const {username, password}=req.body;
    if(!username || !password){
        return res.status(400).json({msg:"name or pass empty"});
    }
    const token=jwt.sign({username},process.env.JWT_Secret,{expiresIn:'30d'});
    res.status(200).json({msg:"user created",token});
}

const dashboardpage=(req,res)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({msg:"No token provided"})
    }
    const token=authHeader.split(' ')[1];
    try{
        const decorded =jwt.verify(token,process.env.JWT_Secret);
        const {username}=decorded;
        res.status(200).json({msg:username})
    }catch(err){
        return res.status(401).json({msg:"Failed"});
    }

}

module.exports={loginPage,dashboardpage};