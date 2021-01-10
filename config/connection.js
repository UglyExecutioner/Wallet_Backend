const Sequelize = require('sequelize');
require('dotenv').config();
// Option 1: Passing parameters separately
console.log(process.env.DATABASE,process.env.USER,process.env.PWD)
const sequelize = new Sequelize(process.env.DATABASE,process.env.USER,process.env.PWD, {
  host: process.env.HOST,
  dialect: 'postgres',
  define: {
    timestamps: false
},
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


//Uncomment this line for the fist time to sync the tables in your local db

// sequelize.sync().then(() => {
//     console.log("Drop and re-sync db.");
//    }).catch((e)=>{
//        console.log("Error at sync",e);
//    });


sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
module.exports = sequelize;