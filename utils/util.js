require('dotenv').config();

 const service={
    PORT:process.env.PORT||5000,
    USER:process.env.USER,
    PASSWORD:process.env.PASSWORD,
    DB:process.env.DB
}

const formatDate=(date)=>{
   var dd = date.getDate();
   var mm = date.getMonth()+1;
   var yyyy = date.getFullYear();
   if(dd<10) {dd='0'+dd}
   if(mm<10) {mm='0'+mm}
   date = `${yyyy}/${mm}/${dd}`;
   return date
}



const Last7Days =(thisDate)=> {
   // console.log(thisDate);
   var result = [];
   for (var i=0; i<7; i++) {
       var d = new Date(thisDate);
       d.setDate(d.getDate() - i);
       result.push( formatDate(d) )
   }
   // console.log(result)
   return result;
}

const LastMonth =()=>{

}


 module.exports={
    service,
    Last7Days
 }