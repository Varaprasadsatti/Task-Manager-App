const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user-routes");
const taskRouter = require("./routes/task-routes")

require('dotenv').config()

const port = process.env.PORT

require("./database");

const app = express()

app.use(
    cors({
        origin : ["http://localhost:5173"],
        methods :["GET", "PUT","POST","DELETE"],
        credentials : true,
}))

app.use(cookieParser())

app.use(express.json())

app.use("/api/user",userRouter);
app.use("/api/task",taskRouter);


app.use("/api",(req,res)=>{
    res.status(200).json({message:"Hello Express"})
})

app.listen(port,() => console.log("app is running at port 5000"));