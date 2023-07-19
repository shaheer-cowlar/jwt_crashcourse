const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:Number,
    email:{
       type:String,
//       lowercase:true,
       required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>Date.now()
    }
})

module.exports=mongoose.model("User",userSchema)


