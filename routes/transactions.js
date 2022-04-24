const {Router}  = require('express');
const router = Router();

const {getTransactionsByDate,getTransactionsGrouped, compareTransactions} = require('../controllers/transactionsController');//get all transactions 

router.post('/all',getTransactionsByDate);
router.post('/grouped',getTransactionsGrouped)
router.post('/difference',compareTransactions)



module.exports=router;//Export routes