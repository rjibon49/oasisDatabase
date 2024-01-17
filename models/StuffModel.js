// const { Sequelize } = require("sequelize");
// const db = require("../config/Database");
// const User = require("./UserModel");

// const {DataTypes} = Sequelize;

// const Stuff = db.define('Stuff', {
//     StuffId:{
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     phoneNumber: {
//         type: DataTypes.STRING,
//     },
//     address: {
//         type: DataTypes.STRING,
//     },
// });

// Stuff.belongsTo(User);
// User.hasOne(Stuff);


// module.exports = Stuff;