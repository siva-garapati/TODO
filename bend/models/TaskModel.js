let mongoose=require("mongoose")

let taskSch=new mongoose.Schema({
    _id:String,
    email:String,
    title:String,
    description:String,
    status: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now },
    completedAt: { type: Date, default: null }
    // "status":{
    //     default:"pending",
    //     type:String
    // },
    // "created at":Date,
    // "completed at":{
    //     default:null,
    //     type:Date
    // }
})

module.exports=mongoose.model("tasks",taskSch)