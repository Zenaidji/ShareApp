etablir une connexion avec l'object Mongoose
fichier de configuration de la connexion
const dbconection=new Mongoose(URI,option);
etablire un shema 
new Mongoose.shema({....})
 le compiler avec un modèle avec l'instance de la connexion en cours
 const dbconection=Require('dbConextion');
 dbconection.model(nom,shema,collections);
 utilisation de l'api du modèle pour emttre des requêtes
 - create 
 - find
 - update
 - remove




