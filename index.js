require('dotenv').config();
const express = require('express');
const mongoose=require('mongoose');
const axios = require('axios');
const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');

const connectToDB=require('./db');

const materialRoutes = require('./src/routes/routes');
const s3Routes = require('./src/routes/s3routes');

const CLOUDINARY_CLOUD_NAME=process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY=process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET=process.env.CLOUDINARY_API_SECRET;


const app=express();

connectToDB();

app.use(express.json());  
app.use(materialRoutes);
// app.use('/s3',s3Routes);

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


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const checkS3Connection = async () => {
    try {
        const data = await s3Client.send(new ListBucketsCommand({}));
        console.log('Connected to S3, buckets:', data.Buckets);
    } catch (error) {
        console.error('Error connecting to S3:', error.message);
    }
};

checkS3Connection();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})
