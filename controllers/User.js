const User = require("../models/UserModel.js");
const bcrypt = require("bcrypt");

const createUser = async(req, res) => {
    const {name, email, phoneNumber, password, confirmPassword, role} = req.body;
    
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
    
        if (existingUser) {
          return res.status(409).json({ message: 'This Email already exists' });
        }
        if(password !== confirmPassword)
        return res.status(400).json({
            msg: "Password do not match"
        })
        const saltround = 10;
    
        // Hash the password
        const hashPassword = await bcrypt.hash(password, saltround);
    
        // Create the user
        const newUser = await User.create({
          name,
          email,
          phoneNumber,
          password: hashPassword,
          role,
        });
    
        return res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Registration failed' });
    }
};

const getUsers = async(req, res) => {
    try {
        const response = await User.findAll ({
            attributes:['uuid', 'name', 'email', 'phoneNumber', 'role'],
            order: [['id', 'DESC']]
        });
        res.status(200).json(response);
    } catch(error) {
        res.status(500).json({msg: error.messgae});
    }
}

module.exports = { createUser, getUsers};