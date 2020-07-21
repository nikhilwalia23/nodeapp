require('dotenv').config()
//Package Used inside this File
const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const path = require("path");

const authen = require("./routes/authentication.js");
const userRoutes = require("./routes/user.js");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orederRoutes = require("./routes/order");
const paymentRoutes = require("./routes/payment");


//DataBasae Connection

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true,

}).then(() => {
    console.log("DATABASE CONNECTED");
});


//Middleware Stuff
app.use(bodyparser.json());
app.use(cookieparser());
app.use(cors()); 

//My Routes
app.use("/api",authen);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orederRoutes);
app.use("/api",paymentRoutes);

//Check For Production
if(process.env.NODE_ENV === "production")
{
console.log("are You in Production Model");
}
//Sever running at Port 8000
const port =process.env.PORT || 8000;
app.listen(port,() => {
    console.log('App is running at http://localhost$',port );
});


