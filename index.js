require('dotenv').config();
const express = require('express');
const mongoose=require('mongoose');
const connectToDB=require('./db');
const axios = require('axios');
const materialRoutes = require('./src/routes/routes');

const CLOUDINARY_CLOUD_NAME=process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY=process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET=process.env.CLOUDINARY_API_SECRET;


const app=express();
connectToDB();

app.use(express.json());  
app.use(materialRoutes);

app.get('/',(req,res)=>{
    res.send('Hello World');
})

const port=process.env.PORT || 3000;

axios.get(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/ping`, {
    auth: {
      username: CLOUDINARY_API_KEY,
      password: CLOUDINARY_API_SECRET,
    },
}).then((response) => {
    console.log('Connection successful:', response.data);
}).catch((error) => {
    console.error('Connection failed:', error.message);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})
