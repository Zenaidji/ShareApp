const { add } = require("../models/user.model");

 class IoController{
    io;

    constructor(io){
        this.io = io;
    }



    handleSocket(socket){

        //this.add(socket);
        this.doOPeration(socket,"add");
        this.doOPeration(socket,"rent");
        this.doOPeration(socket,"remove");
        this.doOPeration(socket,"free");

       
    }

    


    doOPeration(socket,msg){
        socket.on(msg,(id,discription)=>{socket.broadcast.emit(msg,{_id:id,discription:discription})});

    }
  
 

}


module.exports=IoController;