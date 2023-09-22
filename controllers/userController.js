const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getAllusers = async(req,res) =>{
    try {
        const user = await userModel.find({})
        return res.status(200).send({
            userCount:user.length,
            success:true,
            massage:"All user data",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            massage:'Error in register in colback',
            success:false,
            error
        }) 
    }

}

// create register user
exports.registerController = async(req,res)=>{
    try {
        const {username,email,password} = req.body
        if(!email|| !username|| !password){
            return res.status(400).send({
                success:false,
                massage:'please fill all fields'
            })
        }
        const existingUser = await userModel.findOne({email})
        //Check user Existing
        if(existingUser){
            return res.status(401).send({
                success:false,
                massage:'User Already Exist'
            })
        }

        const hashPassword = await bcrypt.hash(password,10);
        // password = hashPassword
        //Save new user
        const user = new userModel({username,email,password:hashPassword});
        await user.save();
        return res.status(201).send({
            success:true,
            massage:'New User Created',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            massage:'Error in register in colback',
            success:false,
            error
        })
    }
}

// login
exports.loginController = async(req,res)=>{
    try {
        const {email,password} = req.body
        //validation
        if(!email|| !password){
            return res.status(401).send({
                success:false,
                massage:'Please provide currect email & password'
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(200).send({
                success:false,
                massage:`${user.email} is not registered`
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).send({
                success:false,
                massage:'Invalid user name or password'
            })
        }
        return res.status(200).send({
            success:true,
            massage:'Login Successfull',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            massage:'Error in login colback',
            success:false,
            error
        }) 
    }
}