const express = require('express');

const routes = express.Router();

const userModel = require('../models/user-model');

const UserController =require('../controller/usercontroller')

routes.post("/addBlog", userModel.UploadBlogImg, UserController.addBlog);

routes.get('/viewBlog',UserController.viewBlog);

routes.delete('/deleteBlog/:id', UserController.deleteBlog);

routes.put('/editBlog/:id', UserController.editBlog);


module.exports = routes;