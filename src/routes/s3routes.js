const express = require('express');
const { S3Client,PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const router = express.Router();
const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
});

async function generatePresignedUrl(fileName, fileType) {
    const newFileName=`image-${Date.now()}.jpg`
    const key = `/uploads/dexterous/${newFileName}`;
    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: key,
        ContentType: fileType,
        // ACL: 'public-read',
    };

    const command = new PutObjectCommand(params);

    try {
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return { presignedUrl: url, key: params.Key };
    } catch (err) {
        console.error('Error generating presigned URL:', err);
        throw err;
    }
}


async function generatePresignedGetUrl(key) {
    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: key,
    };

    const command = new GetObjectCommand(params);

    try {
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return url;
    } catch (err) {
        console.error('Error generating presigned GET URL:', err);
        throw err;
    }
}

async function deleteObjectFromS3(key) {
    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: key,
    };

    const command = new DeleteObjectCommand(params);

    try {
        const response = await s3Client.send(command);
        console.log('DeleteObject response:', response);
    } catch (err) {
        console.error('Error deleting object from S3:', err);
        throw err;
    }
}

module.exports = { router, generatePresignedUrl, generatePresignedGetUrl, deleteObjectFromS3 };
