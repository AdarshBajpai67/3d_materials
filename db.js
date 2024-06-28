require('dotenv').config();
const mongoose=require('mongoose');

const mongo_url=process.env.MONGO_URL;


const connectToDB=async()=>{
    try{
        await mongoose.connect(mongo_url);
        console.log('Connected to MongoDB');
    }catch(err){
        console.error('Error connecting to MongoDB',err);
    }
}

module.exports=connectToDB;