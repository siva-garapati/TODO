let express=require("express")
const { addTask, getTasks, del, update, changeStatus, completedTasks, task } = require("../controllers/TaskController")

let route=new express.Router()

route.post("/add",addTask)
route.get("/tasks",getTasks)
route.delete("/delete/:id",del)
route.put("/update",update)
route.put("/changestatus",changeStatus)
route.get("/completedtasks",completedTasks)
route.get("/task/:id",task)

module.exports=route