const mongoose = require('mongoose');

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connect to mongoose database');
    }catch(e){
        console.log(`Mongo connect ${e}`);
    }
}
module.exports = connectDb;