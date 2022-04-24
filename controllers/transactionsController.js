const {Transactions} = require('../models');

const {Last7Days} = require('../utils/util')

const getTransactionsByDate=async (req,res)=>{
    /*
    0.array for dates and Date obj
    1.get request requirements(start date and end date)
    2.run static functino to get data
    3.sort by date
    4.return data
    */ 
    try{
        let dates=[];
        let today = new Date();

        let {start,end,status}=req.body;

        start = `${start}:00:00`;
        end = `${end}:00:00`;
        let byDate = await Transactions.Range(start,end,status);
        // let byDate = await Transactions.ValidCountries();

        // console.log('data',byDate);
        res.json({transaction:byDate,date:dates});
        // res.json({start,end});
    }
    catch(error){
        console.error(error);
        res.send(error);
    }
}


const getTransactionsGrouped =async(req,res)=>{
    /*
    1.get params
    2.attach and run static fn
    3.loop through result to accumulate result to get total
    */
    try{

        let {start,end,status} =req.body;

        let result = await Transactions.CountTranss(start,end,status);

        res.json({result})



    }
    catch(e){
        console.error(e)
    }
}

const compareTransactions = async(req,res)=>{
    /*
    0.get data from body 
    1.fetch yesterday's data,
    2.fetch today's data
    3.compare 
    4.return as response 
    */ 
    try{

        let {yesterday,today}=req.body

        const forYesterday = await Transactions.Range(`${yesterday}:00:00`,`${yesterday}:23:59`);
        const forToday = await Transactions.Range(`${today}:00:00`,`${today}:23:59`);

        console.log(yesterday,today);
        const difference = parseInt(forToday.length)-parseInt(forYesterday.length);
        const percent = (difference/100)*parseInt(forYesterday.length)

        const result = {
            yesterday:forYesterday.length,
            today:forToday.length,
            difference,
            percentage:difference>0?percent:(percent*-1)
        }
        // console.log(result);
        res.json(result);

    }
    catch(e){
        console.log(e)
    }
}

module.exports={
    getTransactionsByDate,
    getTransactionsGrouped,
    compareTransactions
}