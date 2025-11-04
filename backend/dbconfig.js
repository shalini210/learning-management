const mongoose = require("mongoose")
require('dotenv').config()
const connString =  process.env.MONGODB_URI
mongoose.connect(connString)
.then(()=>
console.log("dbconnected "))
.catch(()=>
{
    console.log("err is db connection  ")
})
