const { hash } = require('bcrypt');
const mongoose = require('mongoose');

const useSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'User Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    blogs:[
        {
        type:mongoose.Types.ObjectId,
        ref:"Blog"
        }
    ]
},{timestamps:true})

const userModel = mongoose.model('User',useSchema);
module.exports = userModel