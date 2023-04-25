let userlogin;
let userpassword;
let username;
let list;
let myId;
let cpt=0;
let prob;

let socket=io();



const setup = () => {
  username = document.getElementById('username');
  discription=document.getElementById('desc');
  prob=document.getElementById('probleme');

  getUser();
  document.getElementById('logout').addEventListener('click', logout);
  list= document.getElementById("disponible");
  document.getElementById('ajouter').addEventListener('click',create);

  getAvailableItems();
  getRentedItemsByOthers();
  getRentedItemsByMe();
  
}
window.addEventListener('DOMContentLoaded', setup);






const getUser = async () => {
  const requestOptions = {method :'GET',};
  const response = await fetch('/user/me', requestOptions);
  if (response.ok) {
    const user = await response.json();
    myId=user.id;
    document.getElementById('name').innerHTML+=user.name.toUpperCase();
    document.getElementById('id').innerHTML+=user.id
  }
  else {
    
    const error = await response.json();
    handleError(error);
  }
}


const logout = async () => {
  const requestOptions = {
                         method :'GET',
                       };
  const response = await fetch(`/access/logout`, requestOptions);
  if (response.ok) {
    console.log('logout');
    window.location.href= '/';
  }
}



const handleError = error => {
  if (error.redirectTo)
    window.location.href= error.redirectTo;
  else
    console.log(`erreur : ${error.message}`);
}



const create=async ()=>{
    discription = document.getElementById('desc');
    if(discription.value!='' && discription.value!=undefined){
     
    const requestOptions={
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({discription:discription.value,owner:myId}),
       
    }
    const response = await fetch('/item', requestOptions);
    if(response.ok){
        const item=await response.json();
        socket.emit("add",item._id,item.discription);
        const buttonEmprunt= buildElement("emprunter","button","emprunter");
        const buttonSup= buildElement("X","button","supprimer");
       
        buttonSup.addEventListener("click",()=>removeItem(item._id));
        buttonEmprunt.addEventListener("click",()=>rentItem(item._id));

        const li=buildElement(item.discription,"div",item._id);
        li.appendChild(buttonEmprunt);
        li.appendChild(buttonSup);
        list.appendChild(li);

    }
    else{
        const error =await response.json()
        console.log(error);

    }  
  }  

}

const getAvailableItems=async()=>{
    const requestOptions={
     method: 'GET'
    }
    const response=await fetch('/item',requestOptions);
    if(response.ok){
        const items=await response.json();
        buildAvailableItems(items);
    }
    else {
    
        const error =await response.json()
        console.log(error);

    }    
}



const getRentedItemsByOthers=async()=>{
  const requestOptions={
   method: 'GET'
  }
  const response=await fetch('item/rentedbyothers',requestOptions);
  if(response.ok){
    
      const items=await response.json();
      buildRentedItemsByOthers(items)
  }
  else {
  
      const error =await response.json()
      console.log(error);

  }    
}


const getRentedItemsByMe=async()=>{
  const requestOptions={
   method: 'GET'
  }
  const response=await fetch('item/rentedbyme',requestOptions);
  if(response.ok){

      const items=await response.json();
      buildRentedItems(items);
  }
  else {
  
      const error =await response.json()
      console.log(error);

  }    
}



const removeItem=async (id)=>{
  const remove=id;

  const requestOPtions={method:'DELETE'};
  const response = await fetch(`/item/${remove}`,requestOPtions);

  if(response.ok){
    const item=await response.json();
    if(item!=null){
    document.getElementById(item._id).remove();
    socket.emit("remove",item._id,discription);
    }
    else{
      prob.innerHTML="seul le propietaire de l'objet peut le supprimer"
    }
  }
  else{
  
    const error=response.json();
    console.log(error);

  }
}



 const rentItem=async(id)=>{
  if(cpt<2){

  const rent=id;
  const requestOptions={method:'PUT',headers : { "Content-Type": "application/json" },};
  const response=await fetch(`item/${rent}`,requestOptions);

  
  if(response.ok){
   
    const item=await response.json();
    document.getElementById(id).remove();

    const buttonLibrer= buildElement("librer","button","librer");
    buttonLibrer.addEventListener("click",()=>{freeItem(id)});
    const li=buildElement(item.discription,"div",item._id);

    li.appendChild(buttonLibrer);
    const loue=document.getElementById("loue");
    loue.appendChild(li);
    socket.emit("rent",item._id,item.discription)
    cpt++;

  }else{
    const error=response.json();
    console.log(error);
  }
}
}

 

   const freeItem=async(id)=>{


  const free=id;
  const requestOptions={method:'PUT',headers : { "Content-Type": "application/json" },};
  const response=await fetch(`item/liberer/${free}`,requestOptions);
  
  if(response.ok){
    console.log(response);

    const item=await response.json();
        
    cpt--;
   
    document.getElementById(id).remove();
    const buttonEmprunt= buildElement("emprunter","button","emprunter");
    const buttonSup= buildElement("X","button","supprimer");

    const li=buildElement(item.discription,"div",item._id);   
    buttonSup.addEventListener("click",()=>removeItem(item._id));
    buttonEmprunt.addEventListener("click",()=>rentItem(item._id));

    li.appendChild(buttonEmprunt);
    li.appendChild(buttonSup);
    list.appendChild(li);
    socket.emit("free",item._id,item.discription);
    
 
  }else{
    const error=response.json();
    console.log(error);
  }



  } 





const buildAvailableItems=(items)=>{
  const objetDispo=document.getElementById("disponible");
  for(let item of items){
     
    if(item.status==true){
       const buttonEmprunt= buildElement("emprunter","button","emprunter");
       const buttonSup= buildElement("X","button","supprimer");

       buttonSup.addEventListener("click",()=>removeItem(item._id));
       buttonEmprunt.addEventListener("click",()=>rentItem(item._id));

       const li=buildElement(item.discription,"div",item._id);

       li.appendChild(buttonEmprunt);
       li.appendChild(buttonSup);
       objetDispo.appendChild(li);           
    }
}
}



const buildRentedItems=(items)=>{
  const loue=document.getElementById("loue")
  for(let item of items){
      
      const librer=buildElement("librer","button","librer");
      const li=buildElement(item.discription,"div",item._id);
      librer.addEventListener("click",()=>{freeItem(item._id)});

      li.appendChild(librer);
      loue.appendChild(li);
}
}



const buildRentedItemsByOthers=(items)=>{
  for(let item of items){
    const autre=document.getElementById("autre");
    const li=buildElement(`${item.discription.toUpperCase()} loué par ${item._id}`,"div",item._id);
    autre.appendChild(li);   
     
}
}


const buildElement =(content,element,id=null)  => {
    const createdElement = document.createElement(element);
    createdElement.id=id;
    createdElement.textContent = content;
    return createdElement;
  }


  





  socket.on('add', (item)=>{
        const objetDispo=document.getElementById("disponible");
        const buttonEmprunt= buildElement("emprunter","button","emprunter");
        const buttonSup= buildElement("X","button","supprimer");
        buttonSup.addEventListener("click",()=>removeItem(item._id));
        buttonEmprunt.addEventListener("click",()=>rentItem(item._id));
        const li=buildElement(item.discription,"div",item._id);
        li.appendChild(buttonEmprunt);
        li.appendChild(buttonSup);
        objetDispo.appendChild(li);  
          
  });


  socket.on('remove', (item)=>{
    const element=document.getElementById(item._id);
    element.remove();   
      
});


socket.on('rent', (item)=>{
  const element=document.getElementById(item._id);
  element.remove();   
  const autre=document.getElementById("autre");
  const li=buildElement(`${item.discription.toUpperCase()}     est  loué par ${item._id}`,"div",item._id);
  autre.appendChild(li);   
 
    
});



socket.on('free', (item)=>{
  const element=document.getElementById(item._id);
  element.remove();   

  const buttonEmprunt= buildElement("emprunter","button","emprunter");
  const buttonSup= buildElement("X","button","supprimer");

  const li=buildElement(item.discription,"div",item._id);   
  buttonSup.addEventListener("click",()=>removeItem(item._id));
  buttonEmprunt.addEventListener("click",()=>rentItem(item._id));

  li.appendChild(buttonEmprunt);
  li.appendChild(buttonSup);
  list.appendChild(li);
    
});
























  