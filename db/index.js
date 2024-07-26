const mongoose=require("mongoose");

mongoose.connect('mongodb+srv://Anant_123:Anant%405569@cluster0.q1mjyfh.mongodb.net/course_selling_app2');

const adminschema=new mongoose.Schema({
   username:String,
   password:String
})

const userschema=new mongoose.Schema({
    username:String,
   password:String,
   purchasedcourse:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Courses'
   }]
})

const coursesschema=new mongoose.Schema({
   title:String,
   description:String,
   imagelink:String,
   price:Number
})

const Admin=mongoose.model('Admin',adminschema);
const User=mongoose.model('User',userschema);
const Courses=mongoose.model('Courses',coursesschema);

module.exports={
    Admin,
    User,
    Courses
}