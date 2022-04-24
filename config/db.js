const {Sequelize} = require('sequelize');
const {service} = require('../utils/util');

const sequelize = new Sequelize(
  service.DB,
  service.USER,
  service.PASSWORD,{
      host:'localhost',
      dialect:'mysql',
      operatorsAliases:false,//

      pool:{
        max:5, 
        min:0,
        acquire:30000,
        idle:10000
  }
      }
  
);


module.exports=sequelize