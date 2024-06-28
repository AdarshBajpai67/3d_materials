const mongoose=require('mongoose');

const connectToDB=async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/dexterous_assign');
        console.log('Connected to MongoDB');
    }catch(err){
        console.error('Error connecting to MongoDB',err);
    }
}

module.exports=connectToDB;