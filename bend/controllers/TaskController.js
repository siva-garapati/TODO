let taskModel=require("../models/TaskModel")
let {v4:uuidv4}=require("uuid")

let addTask=async(req,res)=>{
    try{
        let data=new taskModel({...req.body,"_id":uuidv4(),"email":"abc@gmail.com"})
        await data.save()
        res.json({"msg":"Task saved"})
    }catch(err){
        res.json({"err":"error in adding task"})
    }
}

let getTasks=async(req,res)=>{
    try{
        let data=await taskModel.find({"email":"abc@gmail.com","status":"pending"},{"modified at":0})
        res.json(data)
    }catch(err){
        res.json({"err":"error in fetching tasks"})
    }
}

let task=async(req,res)=>{
    try{
        let data=await taskModel.findById(req.params.id)
        res.json(data)
    }catch(err){
        res.json({'msg':'error in fetching task'})
    }
}

let del=async(req,res)=>{
    try{
        await taskModel.findByIdAndDelete(req.params.id)
        res.json({"msg":"task deleted"})
    }catch(err){
        res.json({"msg":"error in deleting task"})
    }
}

let update=async(req,res)=>{
    try{
        await taskModel.findByIdAndUpdate(req.body._id,req.body)
        res.json({'msg':'task updated'})
    }catch(err){
        res.json({"msg":"error in updating"})
    }
}

let changeStatus=async(req,res)=>{
    try{
        await taskModel.findByIdAndUpdate(req.body._id,req.body)
        res.json({'msg':'status changes'})
    }catch(err){
        res.json({'msg':'error in changing status'})
    }
}

let completedTasks=async(req,res)=>{
    try{
        let data=await taskModel.find({'status':'completed'})
        res.json(data)
    }catch(err){
        res.json({'msg':"failed to fetch completed tasks"})
    }
}

module.exports = { addTask, getTasks, del, update, changeStatus, completedTasks,task}