const mongoose=require('mongoose');
const dbConenection=require('../controllers/db.controller');
const  itemShema=new mongoose.Schema(

{
discription:{type:String, required:true,},
status:{type:Boolean,default:true},
emprunteur:{type:String},
owner:{type:String},


}
);
module.exports =itemShema;

const Items=dbConenection.model('Item',itemShema,'items');
module.exports.model = Items;




