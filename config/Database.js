const {Sequelize} = require("sequelize");

const db = new Sequelize('oasisdb', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

module.exports = db;


// const { Sequelize } = require("sequelize");
// require('dotenv').config();

// const db = new Sequelize(process.env.DB_name, process.env.DB_USER, process.env.DB_password, {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
// });

// module.exports = db;