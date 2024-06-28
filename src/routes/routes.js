const express = require('express');
const router=express.Router();
const materialController = require('../controller/controller');
const upload=require('../middleware/imageUpload');

const Material = require('../models/models');

router.post('/materials',upload.single('imageUrl'),materialController.createMaterial)  //Add a new material to the database, including an image upload

router.get('/materials',materialController.getAllMaterials) //: Fetch all materials from the database, excluding image data.

router.get('/materials/:id',materialController.getMaterialById)  //Retrieve a specific material by its ID, including its associated image.

router.put('/materials/:id',upload.single('imageUrl'),materialController.updateMaterial)  //Update an existing material's details, optionally updating its associated image

router.delete('/materials/:id',materialController.deleteMaterial)  //Remove a material from the database by its ID.

module.exports=router;