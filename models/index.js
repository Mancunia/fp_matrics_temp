const sequelize = require('../config/db');

const {Sequelize,DataTypes} = require('sequelize');
// console.log(dbConfig);

 const db={};

 db.Sequelize = Sequelize;
 db.sequelize = sequelize;

 //table models
 db.Transactions = require('./transactionModel')(sequelize,DataTypes);
 db.Users = require('./userModel')(sequelize,DataTypes);
 db.Country = require('./countryModel')(sequelize,DataTypes);
//  db.Person = require('./personModel')(sequelize,DataTypes);// User table model
//  db.Users = require('./userModel')(sequelize,DataTypes);// User table model
//  db.Question = require('./questionModel')(sequelize,DataTypes);// question table model
//  db.Answer = require('./answerModel')(sequelize,DataTypes);// answer table model
 


db.sequelize.sync({force:false}).then(()=>{//to prevent overriding of data and unauthorized tables
    console.log('Synced')
}).catch((error)=>{
    console.log('error while syncing',error)
})

module.exports=db;





