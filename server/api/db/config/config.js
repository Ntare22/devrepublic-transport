const dotenv = require('dotenv');

dotenv.config();
console.log(">>>>>>>>>>>>>>>>>", process.env.NODE_ENV)
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.TESTDB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
};
