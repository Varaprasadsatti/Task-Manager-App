const mongoose = require("mongoose")
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("mongodb connection successful")).catch((e)=>console.log(`error occured : ${e}`))



//mongodb+srv://varaprasadsatti771:varaprasadsatti771@cluster0.ve4d8.mongodb.net/