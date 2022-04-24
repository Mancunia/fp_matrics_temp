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
    console.log(thisDate);
    var result = [];
    for (var i=0; i<=7; i++) {
        var d = new Date(thisDate);
        d.setDate(d.getDate() - i);
        result.push( formatDate(d) )
    }
    // console.log(result)
    return result;
 }


 const Fetch =async(url,params)=>{
    try{
         let data=await fetch(url,{
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(params)
    });

    return await data.json()
    }
    catch(e){
        console.log(e);
        // throw Error(error);
    }  
 }


 const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$#~*';
const genRandCode= (length)=>{
    length = parseInt(length);
    let result = ""
    let charactersLength = characters.length;
    for ( var i = 0; i < length ; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}

 const onlyUnique=(value, index, self)=>{
    return self.indexOf(value) === index;
  }

  const service={
      baseURL:"127.0.0.1:5000/"
  }


  const toKays=()=>{

  }

 export {
     Last7Days,
     Fetch,
     onlyUnique,
     genRandCode,
     service
 }