// // DoctorModel.js
// const { Sequelize } = require("sequelize");
// const db = require("../config/Database");
// // const User = require("./UserModel");
// // const Schedule = require('./ScheduleModel');
// const { User, Schedule } = require("./UserModel");

// const {DataTypes} = Sequelize;

// const DoctorProfile = db.define('DoctorProfile', {
//     doctorProfileId: {
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
//     specialization: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
//     education: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
//     licenseNumber: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
// });

// // Correct the association definition
// DoctorProfile.hasMany(Schedule, { foreignKey: 'doctorProfileId' });
// DoctorProfile.belongsTo(User, { foreignKey: 'userId' });

// module.exports = { DoctorProfile, User, Schedule  };

// const { Sequelize } = require("sequelize");
// const db = require("../config/Database");
// const User = require("./UserModel");

// const { DataTypes } = Sequelize;

// const Doctor = db.define('Doctor', {
//     DoctorId: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     specialization: {
//         type: DataTypes.STRING,
//     },
//     education: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     licenseNumber: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
// });

// // Establishing the association with the User model
// Doctor.belongsTo(User);
// User.hasOne(Doctor);

// module.exports = Doctor;