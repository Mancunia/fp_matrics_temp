const express = require('express');
const sequelize = require('./config/db');
const {service} = require('./utils/util');
const cors = require('cors')

console.log(service)


const app = express();

app.use(cors())


var allowlist = ['127.0.0.1:3000', 'http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

// uses (middleware)
app.use(express.urlencoded({extended:true}));
app.use(express.json());



sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
app.emit('ready');
}).    
catch ((error)=>{
console.error('Unable to connect to the database:', error);
app.emit('Error');
})

app.on('ready',()=>{
    app.listen(service.PORT,()=>{

        console.log(`Connection established on port ${service.PORT} `);
    })
}).on('Error',()=>console.log('Connection error'));


// .catch((e)=>{
//     console.log(e);
// })


app.use('/transaction',require('./routes/transactions')); //transactions route
app.use('/user',require('./routes/users'));//users route


app.use('',(req,res)=>{
    res.send('Not found')
})