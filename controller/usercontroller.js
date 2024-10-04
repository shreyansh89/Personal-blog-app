const userModel = require('../models/user-model');
const fs = require('fs');
const path = require('path')

module.exports.addBlog = async(req,res) => {
    try {
        const ImagePath = "";
        if (req.file) {
            ImagePath = userModel.BlogModelPath + "/" + req.file.filename;
        } else {
            return res.status(400).json({ mes: "Image not found", status: 0 });
        }
        if (req.body) {
            req.body.BlogImage = ImagePath;
            req.body.Created_date = new Date().toLocaleDateString();
            const data = await userModel.create(req.body);
            if (data) {
                return res.status(200).json({ mes: "data insert succesfully", data: data, status: 1 });
            }
            else {
                return res.status(400).json({ mes: "data null", status: 0 });

            }

        }
        else {
            return res.status(200).json({ mes: "data not found", status: 0 });
        }
    }
    
    catch (error) {
        console.log(error);
        return res.status(400).json({ mes: "something worng", status: 0 });
    }
}


module.exports.viewBlog = async (req, res) => {
    try {
        const viewData = await userModel.find({});
        if (viewData != "") {
            return res.status(200).json({
                msg: "Here is all Blog data", viewData: viewData, status: 1
            });
        } else {
            return res.status(200).json({ msg: "No post found", status: 0 });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mes: "something worng", status: 0 })
    }
   
}


module.exports.deleteBlog = async (req, res) => {
    try {
        const olddata = await userModel.findById(req.params.id);
        if (olddata) {
            const oldImage = olddata.BlogImage;
            if (oldImage) {
                const fullpath = path.join(__dirname, ".." + olddata.BlogImage);
                const dImage = await fs.unlinkSync(fullpath);
                const deleteRecord = await userModel.findByIdAndDelete(req.params.id);
                if (deleteRecord) {
                    return res.status(200).json({ mes: "Record and image delets successfully", status: 0 });
                } else {
                    return res.status(200).json({ mes: "Record delete successfully", status: 0 });
                }
            }
            else {
                const deletedata = await userModel.findByIdAndDelete(req.params.id, req.body)
                if (deletedata) {
                    return res.status(200).json({ mes: "Delete record sucessfully", deletedata: deletedata, status: 1 });
                }
                else {
                    return res.status(200).json({ mes: "invliad Data", status: 0 });

                }
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ mes: "something worng", status: 0 })
    }
}


module.exports.editBlog = async (req, res) => {
    try {
        const oldData = await userModel.findById(req.body.oldId);
        if (req.file) {
            if (oldData.BlogImage) {
                const fullPath = path.join(__dirname, ".." + oldData.BlogImage);
                await fs.unlinkSync(fullPath);
            }
            const imagePath = "";
            imagePath = userModel.BlogModelPath + "/" + req.file.filename;
            req.body.BlogImage = imagePath;
            res.locals.user.BlogImage = imagePath;
        } else {
            req.body.BlogImage = oldData.BlogImage;
        }
        const editdata = await userModel.findByIdAndUpdate(req.params.id, req.body)
        const UserData = await userModel.findById(req.body.oldId);
        res.locals.user = UserData;
        if (editdata) {
            return res.status(200).json({ mes: "Edit record sucessfully", editdata: editdata, status: 1 });
        }
        else {
            return res.status(200).json({ mes: "invliad Data", status: 0 });

        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mes: "something worng", status: 0 })
    }
}