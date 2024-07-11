const axios = require('axios');

async function uploadFileToS3(presignedUrl, fileBuffer, fileType) {
    try {
        // console.log('Uploading to S3 with presigned URL:', presignedUrl);
        // console.log('File buffer length:', fileBuffer.length);

        const response = await axios.put(presignedUrl, fileBuffer, {
            headers: {
                'Content-Type': fileType
            }
        });

        // console.log('Upload response status:', response.status);
        // console.log('Upload response headers:', response.headers);
    } catch (err) {
        console.error('Error uploading file:', err);
        throw err;
    }
}

module.exports = { uploadFileToS3 };
