const {Router}=require("express");
const router=Router();
const adminmiddleware=require("../middleware/admin");
const { Admin, User ,Courses } = require("../db");
const jwt=require("jsonwebtoken");
const {jwtsecret}=require("../config");


router.post("/signup",async function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    await Admin.create({
        username:username,
        password:password
    })
    res.json({
        msg:"created succesfully"
    })
})
router.post("/signin",async function(req,res){
  const username=req.body.username;
    const password=req.body.password;
       const user=await User.find({
        username,
        password
       })
       if(user){
    const token=jwt.sign({
        username
    },
    jwtsecret);
    res.json({
          token
    })
}else{
    res.status(411).json({
        msg:"incorrect email and password"
    })
}
})

//i will sending jwt token in headers in authorization i m no sending headers and password in headers
router.post("/courses",adminmiddleware, async function(req,res){
      const title=req.body.title;
  const description=req.body.description;
  const price=req.body.price;
  const imagelink=req.body.imagelink;
// we will add new courses by username and password in headers
  const newcourse= await Courses.create({
  title:title,
  description:description,
  price:price,
  imagelink:imagelink
  })
  console.log(newcourse);
  res.json({
    msg:"the course created succesfully" ,courseId:newcourse._id
  })
})

router.get("/courses",adminmiddleware,async function(req,res){
  const response=await Courses.find({})

  res.json({
    courses:response
  })
})

module.exports=router;