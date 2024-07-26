const jwt=require("jsonwebtoken");
const {jwtsecret}=require("../config");

function adminmiddleware(req,res,next){
const token=req.headers.authorization;

//we use json web token
// now we know we store our headers in authoriation
//so we need bearer assadwff=["bearer" ,"asadwf"]
const words=token.split(" ");
const jwttoken=words[1];
const decodedvalue=jwt.verify(jwttoken,jwtsecret)
if(decodedvalue.username){
    next();
}
else{
    res.status(403).json({
        msg:"you are not authenticated"
    })
}
}


module.exports=adminmiddleware;