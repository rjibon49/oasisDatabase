const { Sequelize } = require("sequelize");
const db = require("../config/Database");

const {DataTypes} = Sequelize;

const User = db.define('User', {
    userId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Patient',
        validate: {
          isIn: [['Admin', 'Doctor', 'Patient'],]
        },
      },
});

module.exports = User;