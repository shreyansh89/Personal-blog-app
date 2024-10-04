const mongoose = require("mongoose");

const multer = require('multer');

const path = require('path');

const imagepath = "/upload";

const UserSchema = mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    content:{
        type : String,
        required : true
    },
    // BlogImage : {
    //     type : String,
    //     required : true
    // },
    Created_date: {
        type : Date,
        // default : Date.now
    }
});

const imgstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", imagepath));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

UserSchema.statics.UploadBlogImg = multer({ storage: imgstorage }).single("PostImg");
UserSchema.statics.BlogModelPath = imagepath;

const userRoute = mongoose.model("user", UserSchema);
module.exports = userRoute;