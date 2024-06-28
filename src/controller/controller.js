const Material=require('../models/models');
console.log(Material);

exports.createMaterial=async (req,res)=>{
    const {name,technology,colors,pricePerGram,applicationTypes}=req.body;
    if (!req.file || !req.body) {
        return res.status(400).json({ error: 'Image is required.' });
    }

    const imageUrl = req.file.path;

    try{
        const newMaterial=new Material({name,technology,colors,pricePerGram,applicationTypes,imageUrl});
        await newMaterial.save();
        res.status(201).json({ message: 'Material created successfully',newMaterial});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

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
        res.status(200).json(material);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.updateMaterial = async (req, res) => {
    const {name,technology,colors,pricePerGram,applicationTypes}=req.body;
    const imageUrl = req.file?req.file.path:'';
    try{
        const material=await Material.findById(req.params.id);
        if(!material){
            return res.status(404).json({message:'Material not found'});
        }

        material.name=name||material.name;   
        material.technology=technology||material.technology;
        material.colors=colors||material.colors;
        material.pricePerGram=pricePerGram||material.pricePerGram;
        material.applicationTypes=applicationTypes||material.applicationTypes;
        material.imageUrl=imageUrl||material.imageUrl;

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
        await material.deleteOne();
        res.status(200).json({message:'Material deleted successfully'});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}