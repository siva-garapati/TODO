let mongoose=require("mongoose")

let taskSch=new mongoose.Schema({
    "_id":String,
    "email":String,
    "title":String,
    "description":String,
    "status":{
        default:"pending",
        type:String
    },
    "created at":Date,
    "completed at":{
        default:null,
        type:Date
    }
})

module.exports=mongoose.model("tasks",taskSch)