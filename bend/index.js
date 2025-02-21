let mongoose=require("mongoose")
let express=require("express")
const route = require("./routes/TaskRoute")
let cors=require("cors")

mongoose.connect("mongodb://127.0.0.1:27017/todo").then(()=>{
    console.log('db ok')
}).catch(()=>{
    console.log("error in db")
})

let app=express()

app.use(express.json())
app.use(cors())
app.use("/",route)

app.listen(5000)