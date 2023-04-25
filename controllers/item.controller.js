const Item = require('../models/item.model').model;

const User = require('../models/user.model').model;
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');




module.exports.createItem= async (req,res)=>{
    try{
    const newItem={...req.body};
    const createdItem= await Item.create(newItem);
    res.status(201).json(createdItem);
    }
    catch(err){
    console.log(`pb création de l'article ${err.message}`);
    res.status(409).json({ message : err.message });

    }
}






 module.exports.getAvailbleItems= async (req,res)=>{
    try{
    const availbleItems=await Item.find({status:true});
    res.status(200).json(availbleItems);
    }
    catch(err){
    console.log(`pb dans getAvailbleItems ${err.message}`);
    res.status(409).json({ message : err.message });
    
    }
} 










 module.exports.getRentedItems= async (req,res)=>{
    try{
    const token = req.cookies.token;
    const decoded = jwt.verify(token, jwtConfig.SECRET_TOKEN);
    const userId = decoded.id; 
    const RentedItems=await Item.find({status:false});
  
    res.status(200).json(RentedItems);
    }
    catch(err){
    console.log(`pb dans getRentedItems  ${err.message}`);
    res.status(409).json({ message : err.message });
    
    }
}






module.exports.getRentedItemsByMe= async (req,res)=>{
    try{
    const token = req.cookies.token;
    const decoded = jwt.verify(token, jwtConfig.SECRET_TOKEN);
    const userId = decoded.id; 
    const RentedItemsbyme=await Item.find({status:false ,emprunteur:userId});
   
    res.status(200).json(RentedItemsbyme);
    }
    catch(err){
    console.log(`pb dans getRentedItemsByMe  ${err.message}`);
    res.status(409).json({ message : err.message });
    
    }
}







module.exports.getRentedItemsByOthers= async (req,res)=>{
    try{
    const token = req.cookies.token;
    const decoded = jwt.verify(token, jwtConfig.SECRET_TOKEN);
    const userId = decoded.id; 
    const RentedItemsothers=await Item.find({status:false ,emprunteur:{$ne:userId}});
    
  
    res.status(200).json(RentedItemsothers);
    }
    catch(err){
    console.log(`pb dans getRentedItemsByOthers  ${err.message}`);
    res.status(409).json({ message : err.message });
    
    }
}
 
 


module.exports.upadteItem= async (req,res)=>{
    try{
    const token = req.cookies.token;
    const decoded = jwt.verify(token, jwtConfig.SECRET_TOKEN);
   
    const userId = decoded.id; 
    const Item= await Item.findByIdAnd(userId,{status:false,emprunteur:userId}, { new : true });
    res.status(201).json(Item);
    }
    catch(err){
    res.status(409).json({ message : err.message });

    }
}




module.exports.removeItem= async (req,res)=>{
    const ID=req.params.remove;
    const token = req.cookies.token;
    const decoded = jwt.verify(token, jwtConfig.SECRET_TOKEN);
  
    try{
    const removed= await Item.findOneAndRemove({_id:ID,owner:decoded.id});
    res.status(201).json(removed);
    }
    catch(err){
    console.log(`pb supression ${err.message}`);
    res.status(409).json({ message : ID });

    }
}

module.exports.rent= async (req,res)=>{
    
    const ID=req.params.rent;
    const token = req.cookies.token;
    const decoded = jwt.verify(token, jwtConfig.SECRET_TOKEN);
    
    try{
    const updated= await Item.findByIdAndUpdate(ID,{status:false, emprunteur:decoded.id});
 
    res.status(201).json(updated);
    }
    catch(err){
    console.log(`pb dans rent ${err.message}`);
    res.status(409).json({ message :err.message });

    }
}

module.exports.free=async(req,res)=>{
    const ID=req.params.free;
    try{
    const updated= await Item.findByIdAndUpdate(ID,{status:true} );
    console.log(updated);
    res.status(201).json(updated);
    }
    catch(err){
    console.log(`pb dans rent ${err.message}`);
    res.status(409).json({ message :err });

    }
}











