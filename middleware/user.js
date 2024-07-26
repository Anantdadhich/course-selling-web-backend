const {jwtsecret}=require("../config");
const jwt=require("jsonwebtoken");

function usermiddleware(req,res,next){ 
    const token=req.headers.authorization;

    const words=token.split(" ");
    const jwttoken=words[1];

    const decodedvalue=jwt.verify(jwttoken,jwtsecret);
    if(decodedvalue.username){
        req.username=decodedvalue.username;
        next();
    }
    else{
        res.status(403).json({
            msg:"you are not authenticated"
        })
    }
}
module.exports=usermiddleware;
