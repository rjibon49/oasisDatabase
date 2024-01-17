// const { Sequelize } = require("sequelize");
// const db = require("../config/Database");
// const User = require("./UserModel");

// const {DataTypes} = Sequelize;

// const AdminProfile = db.define('AdminProfile', {
//     adminProfileId: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     phoneNumber: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
//     address: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
// });

// AdminProfile.belongsTo(User, { foreignKey: 'userId' });

// module.exports = { AdminProfile, User };

// const { Sequelize } = require("sequelize");
// const db = require("../config/Database");
// const User = require("./UserModel");

// const {DataTypes} = Sequelize;

// const Admin = db.define('Admin', {
//     AdminId:{
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

// Admin.belongsTo(User);
// User.hasOne(Admin);


// module.exports = Admin;