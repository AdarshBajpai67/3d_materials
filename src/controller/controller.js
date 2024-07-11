const fs = require('fs');
const axios = require('axios');

const Material = require('../models/models');
const { generatePresignedUrl, generatePresignedGetUrl, deleteObjectFromS3 } = require('../routes/s3routes');
const { uploadFileToS3 } = require('../utils/uploadFilesToS3');

const AWS_REGION = process.env.AWS_REGION;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

exports.createMaterial = async (req, res) => {
    const { name, technology, colors, pricePerGram, applicationTypes } = req.body;
    if (!req.file) {
        return res.status(400).json({ error: 'Image is required.' });
    }

    const image = req.file;
    console.log('Uploaded image details:', image);

    try {
        const { presignedUrl, key } = await generatePresignedUrl(image.originalname, image.mimetype);
        console.log("Generated presigned URL and key:", presignedUrl, key);

        // Ensure the buffer is logged correctly
        console.log('Image buffer length:', image.buffer.length);

        await uploadFileToS3(presignedUrl, image.buffer, image.mimetype);

        const imageUrl = `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com${key}`;
        console.log('Image URL:', imageUrl);

        const newMaterial = new Material({ name, technology, colors, pricePerGram, applicationTypes, imageUrl });
        await newMaterial.save();
        // console.log('Material saved to database:', newMaterial);
        res.status(201).json({ message: 'Material created successfully', newMaterial });
    } catch (err) {
        console.error('Error creating material:', err.message);
        res.status(500).json({ message: "createMaterial", error: err.message });
    }
};


exports.getAllMaterials=async (req,res)=>{
    try{
        const materials=await Material.find().select('-imageUrl');
        // console.log(materials);
        res.status(200).json(materials);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.getMaterialById = async (req, res) => {
    try{
        const material=await Material.findById(req.params.id);
        if(!material){
            return res.status(404).json({message:'Material not found'});
        }
        const s3key=`/${material.imageUrl.split('.com/')[1]}`;
        const imageUrl=await generatePresignedGetUrl(s3key);
        res.status(200).json({...material.toObject(),imageUrl});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.updateMaterial = async (req, res) => {
    const {name,technology,colors,pricePerGram,applicationTypes}=req.body;
    
    try{
        const material=await Material.findById(req.params.id);
        if(!material){
            return res.status(404).json({message:'Material not found'});
        }
        if (req.file) {
            const s3key=`/${material.imageUrl.split('.com/')[1]}`;
            console.log(`Deleting image from S3: Key - ${s3key}, Material ID - ${material._id}`);
            await deleteObjectFromS3(s3key);
            
            const image = req.file;
            // console.log('Uploaded image details:', image);

            const { presignedUrl, key } = await generatePresignedUrl(image.originalname, image.mimetype);
            // console.log("Generated presigned URL and key:", presignedUrl, key);
            // console.log('Image buffer length:', image.buffer.length);
            await uploadFileToS3(presignedUrl, image.buffer, image.mimetype);
            material.imageUrl = `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com${key}`;
        }

        material.name=name||material.name;   
        material.technology=technology||material.technology;
        material.colors=colors||material.colors;
        material.pricePerGram=pricePerGram||material.pricePerGram;
        material.applicationTypes=applicationTypes||material.applicationTypes;
        // material.imageUrl=imageUrl||material.imageUrl;

        await material.save();
        res.status(200).json({message:'Material updated successfully',material});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.deleteMaterial = async (req, res) => {
    try{
        const material=await Material.findById(req.params.id);
        if(!material){
            return res.status(404).json({message:'Material not found'});
        }

        const s3key=`/${material.imageUrl.split('.com/')[1]}`;

        console.log(`Deleting image from S3: Key - ${s3key}, Material ID - ${material._id}`);

        await deleteObjectFromS3(s3key);
        
        await material.deleteOne();
        res.status(200).json({message:'Material deleted successfully'});
    }catch(err){
        console.error('Error deleting material:', err.message);
        res.status(500).json({error:err.message});
    }
}