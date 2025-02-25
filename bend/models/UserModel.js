let mongoose=require("mongoose")

let userSch=new mongoose.Schema({
    _id:String,
    email: { type: String, unique: true },
    name: String,
    password: String
})

module.exports=mongoose.model("user",userSch)