// // patient-profile.model.js
// const { Sequelize } = require("sequelize");
// const db = require("../config/Database");
// const User = require("./UserModel");

// const {DataTypes} = Sequelize;

// const PatientProfile = db.define('PatientProfile', {
//     patientProfileId: {
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
//     age: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     height: {
//         type: DataTypes.FLOAT,
//         allowNull: true,
//     },
//     weight: {
//         type: DataTypes.FLOAT,
//         allowNull: true,
//     },
// });

// PatientProfile.belongsTo(User, { foreignKey: 'userId' });

// module.exports = { PatientProfile, User };

// const { Sequelize } = require("sequelize");
// const db = require("../config/Database");
// const User = require("./UserModel");

// const { DataTypes } = Sequelize;

// const Patient = db.define('Patient', {
//     PatientId: {
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
//     age: {
//         type: DataTypes.INTEGER,
//     },
//     address: {
//         type: DataTypes.STRING,
//     },
//     // Foreign key referencing User model
//     userId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: User,
//             key: 'userId',  // Update this to match the primary key of the User model
//         },
//     },
// });

// Patient.belongsTo(User);
// User.hasOne(Patient);

// module.exports = Patient;