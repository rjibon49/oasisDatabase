// // scheduleModel.js

// const { Sequelize } = require('sequelize');
// const db = require('../config/Database');
// const { DoctorProfile } = require('./DoctorModel');

// const { DataTypes } = Sequelize;

// const Schedule = db.define('Schedule', {
//     scheduleId: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true,
//     },
//     doctorProfileId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     dayOfWeek: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     startTime: {
//         type: DataTypes.TIME,
//         allowNull: false,
//     },
//     endTime: {
//         type: DataTypes.TIME,
//         allowNull: false,
//     },
// });

// // Correct the association definition
// Schedule.belongsTo(DoctorProfile, { foreignKey: 'doctorProfileId' });

// module.exports = { Schedule };