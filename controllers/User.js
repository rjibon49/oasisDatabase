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

const getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            attributes:['uuid','name','email','phoneNumber','role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'User Not Found' });
    }
}

const updateUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});

    const {name, email, password, confirmPassword, phoneNumber, role} = req.body;

    let hashPassword;
    if(password === "" || password === null) {
        hashPassword = user.password
    } else {
        const saltround = 10;
        hashPassword = await bcrypt.hash(password, saltround);
    }
    if(password !== confirmPassword) return res.status(400).json({msg: "Password did not match"});
    try {
        await User.update({
            name,
            email,
            password: hashPassword,
            role,
            phoneNumber
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({msg: "User information Update"});
    } catch(error) {
        res.status(400).json({msg:"User information did not update"})
    }
}

const deleteUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(400).json({msg:"User not found"});
    try{
        await User.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Delete Successfully"});
    } catch(error) {
        res.status(400).json({msg:"User did not delete"})
    }
}



module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser};