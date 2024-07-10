const express=require("express");
const mongoose=require("mongoose");
const userRoutes=require("./routes/user")
const path=require("path")
const app=express();
const cookieparser=require("cookie-parser")
const {checkForAuthenticationcookies}=require("./middleware/authentication")


const PORT =8000;
app.use(express.json())
app.use(express.static(path.join(__dirname, "css")));
app.use(cookieparser())
app.use(checkForAuthenticationcookies("token"))


app.use("/",userRoutes)

mongoose.connect('mongodb://localhost:27017/BillingCounter')
.then(()=>console.log("Mongodb is connected"))
.catch(err=>console.error("mongodb connection error",err))

app.listen(PORT,()=>{
console.log(`server is started at PORT ${PORT}`);
})