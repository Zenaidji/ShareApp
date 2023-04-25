const mongoose=require('mongoose');
const dbConenection=require('../controllers/db.controller');
mongoose.set('runValidators', true);

const  userShema=new mongoose.Schema(
{
name:{type:String, required:true,unique:true},
login:{type:String, required:true,unique:true},
password: {type:String ,required:true,unique : true},
emprunt:{type:Number ,required:true,default:0,max:2},


}
);
module.exports =userShema;

const User=dbConenection.model('User',userShema,'users');
module.exports.model = User;


