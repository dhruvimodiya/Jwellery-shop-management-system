const express = require('express'); 
const cookieParser  = require("cookie-parser")
const app = express();
const errorMiddleware = require('./middleware/error');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
//config
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors())

app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute");
const contact = require("./routes/contactRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",contact);


// serve a static files
app.use(express.static(path.join(__dirname,"./client/build")));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
    
})
//middlewares for errors 
app.use(errorMiddleware)

module.exports = app
