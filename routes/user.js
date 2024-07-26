const {Router}=require("express");
const router=Router();
const usermiddleware=require("../middleware/admin");
const { Admin, User, Courses } = require("../db");
const jwt=require("jsonwebtoken");
const {jwtsecret}=require("../config");

router.post("/signup",async function(req,res){
    const username=req.body.username;
    const password=req.body.password;
     
   await User.create({
        username:username,
        password:password
    })

    res.json({
        msg:"user created"
    })

})

router.get("/courses",usermiddleware,async function(req,res){
    const response=await Courses.find({})

    res.json({
        courses:response
    })
})

router.post("/signin",async function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    const admin=await Admin.find({
        username,
        password
    })
    if(admin){
        const token=jwt.sign({
            username
        },jwtsecret)
        res.json({
            token
        })
    }
    else{
        res.status(403).json({
            msg:"not found"
        })
    }
})

router.post("/courses/:courseid",usermiddleware,async function(req,res){
    const username=req.body.username;
    const courseid=req.params.courseid;
  try{
  await User.updateOne({
    username:username
   },
   {
    "$push":{
        purchasedcourse:courseid    //we will add our course by id
    }
   })
}
catch(e){
    console.log(e)
}
   
   res.json({
    msg:"purchased complete"
   })
       

})

router.get("/purchasedcourse",usermiddleware,async function(req,res){
    const user=await User.findOne({
        username:req.body.username
    })
    console.log(user.purchasedcourse)
    const courses=await Courses.findOne({
        _id:{
            "$in":purchasedcourse
        }
        
    })
    res.json({
        courses:courses
    })
})
module.exports=router;