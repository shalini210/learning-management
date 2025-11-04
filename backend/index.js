require('dotenv').config()
const dbconfig = require("./dbconfig")
const express = require("express")
const authroute =require("./routes/authRoutes")
const app = express();
const auth = require("./middlewares/auth")
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/auth', authroute);
app.listen(process.env.PORT,()=>console.log("server running on "+process.env.PORT))

//  mongoose.connect(process.env.MONGODB_URI)
 



