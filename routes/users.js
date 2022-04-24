const {Router}  = require('express');
const router = Router();

const {LastLogin} = require('../controllers/userController');//get all transactions 

router.post('/',LastLogin);




module.exports=router;//Export routes