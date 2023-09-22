const { mongoose } = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');

exports.getAllBlogController = async(req,res) =>{
    try {
        const blog = await blogModel.find({}).populate('user');
        if(!blog){
            return res.status(200).send({
                success:false,
                massage:"No blog found"
            });
        }
        return res.status(200).send({
            success:true,
            blogCount:blog.length,
            massage:"All Blog Lists",
            blog
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            massage:"Error while getting massage",
            error
        })
    }

}

exports.createBlogController = async(req,res) =>{
    try {
        const {title,description,image,user}  = req.body
        //validation
        if(!title || !description || !image || !user){
            return res.status(400).send({
                success:false,
                massage:"Please provide valid all filed"
            });
        }
        const existingUser = await userModel.findById(user);
        //validation
        if(!existingUser){
            return res.status(201).send({
                success:false,
                massage:"Unable to find User"
            });
        }
        const newBlog = new blogModel({title,description,image,user});

        //Create Session 

        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        existingUser.blogs.push(newBlog);
        await existingUser.save({session})
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success:true,
            massage:"New Blog Posted",
            newBlog
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            massage:"Error while Creating massage",
            error
        })    
    }

}

exports.updateBlogController = async(req,res) =>{
    try {
        const {id} = req.params;
        const {title,description,image} = req.body;
        const blog = await blogModel.findByIdAndUpdate(
            id,
            {...req.body},
            {new:true}
        );
        return res.status(200).send({
            success:true,
            massage:"Blog Updated",
            blog,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            massage:"Error while Updating massage",
            error
        })    
    }

}
exports.getBlogByIdController = async(req,res) =>{
    try {
        const {id} = req.params;
        const blog = await blogModel.findById(id);
        if(!blog){
            return res.status(404).send({
                success:false,
                massage:"Blog not found",
            });
        }
        return res.status(200).send({
            success:true,
            massage:"Fetch single blog",
            blog,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            massage:"Error while massage",
            error
        })    
    }

}
exports.deleteBlogController = async(req,res) =>{
    try {
        // const blog = await blogModel.findByIdAndDelete(req.params.id)
        const blog = await blogModel.findByIdAndDelete(req.params.id)
        .populate("user");
        await blog.user.blogs.pull(blog)
        // await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(400).send({
            success:true,
            massage:"Blog is Deleted"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            massage:"Error while Deleteing massage",
            error
        })   
    }

}
exports.userBlogController=async(req,res)=>{
    try {
        const {id} = req.params;
        const userBlog = await userModel.findById(id).populate("blogs");
        if(!userBlog){
            return res.status(404).send({
                success: false,
                massage: "blogs not found with this id",
              });
        }
        return res.status(200).send({
            success:true,
            massage:"User Blog",
            userBlog,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            massage:"Error in user Blog",
            error
        });
    }

}