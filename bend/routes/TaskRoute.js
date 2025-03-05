let express=require("express")
const { addTask, getTasks, del, update, changeStatus, completedTasks, task, getalltasks, filterStatus, stats } = require("../controllers/TaskController")
const { reg, login } = require("../controllers/UserController")

let route=new express.Router()

route.post("/register",reg)
route.post("/login",login)
route.post("/add",addTask)
route.get("/tasks",getTasks)
route.get('/alltasks',getalltasks)
route.delete("/delete/:id",del)
route.put("/update",update)
route.put("/changestatus",changeStatus)
route.get("/completedtasks",completedTasks)
route.get('/tasks/:status',filterStatus)
route.get("/task/:id",task)
route.get("/stats",stats)

module.exports=route