let mongoose=require("mongoose")

let taskSch=new mongoose.Schema({
    _id:String,
    email:String,
    title:String,
    description:String,
    status: { type: String, default: "pending" },
    createdAt: { type: Date},
    completedAt: { type: Date, default: null }
})

module.exports=mongoose.model("tasks",taskSch)