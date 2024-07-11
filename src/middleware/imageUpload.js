require('dotenv').config();
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            console.log('File format supported');
            cb(null, true);
        } else {
            cb(new Error('Unsupported file format'), false);
        }
    },
    limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
});

module.exports = upload;



// require('dotenv').config();

// const multer = require('multer');
// // const { CloudinaryStorage } = require('multer-storage-cloudinary');
// // const cloudinary = require('cloudinary').v2;

// const upload = multer({
//     fileFilter: (req, file, cb) => {
//         const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//         if (allowedTypes.includes(file.mimetype)) {
//             console.log('File format supported');
//             cb(null, true);
//         } else {
//             cb(new Error('Unsupported file format'), false);
//         }
//     },
//     limits: { fileSize: 1024 * 1024 * 5 }
// });

// //for cloudinary

// // cloudinary.config({
// //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //     api_key: process.env.CLOUDINARY_API_KEY,
// //     api_secret: process.env.CLOUDINARY_API_SECRET
// // });

// // const storage = new CloudinaryStorage({
// //     cloudinary: cloudinary,
// //     params: {
// //         folder: 'materials',
// //         format: async (req, file) => {
// //             const extension = file.mimetype.split('/')[1];
// //             return ['jpg', 'png', 'jpeg'].includes(extension) ? extension : 'jpg';
// //         },
// //         public_id: (req, file) => {
// //             const timestamp = Date.now();
// //             return `my-material-${timestamp}`;
// //         },
// //     }
// // });

// // const upload = multer({
// //     storage: storage,
// //     fileFilter: (req, file, cb) => {
// //         const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
// //         if (allowedTypes.includes(file.mimetype)) {
// //             console.log('File format supported');
// //             cb(null, true);
// //         } else {
// //             cb(new Error('Unsupported file format'), false);
// //         }
// //     },
// //     limits: { fileSize: 1024 * 1024 * 5 }
// // });

// module.exports = upload;
