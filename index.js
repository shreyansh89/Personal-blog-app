const express = require("express");

const port = process.env.port || 8000;

const app = express();

const path = require("path")

const db = require("./config/mongoose");

app.use(express.json());
app.use(express.urlencoded());

app.use("/upload", express.static(path.join(__dirname,"upload")))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", require("./routes/user"));

app.listen(port, (err)=>{
    if(err){
        console.log("Server is not running");
    }
    console.log("sever is running in "+ port);
})