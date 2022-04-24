const {Users} = require('../models');


const LastLogin = async(req,res)=>{
    try{
        let {start,end}=req.body;

console.log('before run')
        const [results] = await Users.LastLogin(start,end);
        console.log('after run')
        console.log(results)

        res.json({Users:results});

    }
    catch(e){

    }

}

module.exports={
    LastLogin

}