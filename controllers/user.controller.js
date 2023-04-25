const User = require('../models/user.model').model;
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

module.exports.home = (_,res) => res.redirect('/user.html');

module.exports.me =
  async (req, res) =>  {
      
   
    const user = await User.findById(req.userId);
    res.status(200).json({ name : user.name  ,id:user.id });
  }

  module.exports.update =
  async (req,res) => {
    
    const token = req.cookies.token;
    const decoded = jwt.verify(token, jwtConfig.SECRET_TOKEN);
    const userId = decoded.id; 
    try{
    const user = await User.findByIdAndUpdate(userId,{$inc:{emprunt:1}})
    res.status(200).json({ name : user.name , message : 'mise à jour réussie'});
    }
    catch(err) {
      console.log("errr")
      res.status(401).json({ message : err.message });


    }
  }