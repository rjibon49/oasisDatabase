const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { User } = require('../models/AllModel');

const createUser = async (req, res) => {
    const { username, email, password, confirmPassword, role } = req.body;

    try {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email },
                    { username },
                ],
            },
        });

        if (existingUser) {
            return res.status(409).json({ success: false, message: 'This email or username already exists' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }

        const saltround = 10;
        const hashpassword = await bcrypt.hash(password, saltround);

        await User.create({
            username,
            email,
            password: hashpassword,
            role,
        });

        return res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ success: false, message: 'Registration failed' });
    }
};

const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['userId', 'username', 'email', 'role'],
            order: [['userId', 'DESC']],
        });
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Error fetching users' });
    }
};

const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['userId', 'username', 'email', 'role'],
            where: {
                [Op.or]: [
                    { userId: req.params.id },
                    { username: req.params.id },
                    { email: req.params.id },
                ],
            },
        });

        if (!response) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ success: false, message: 'Error fetching user' });
    }
};

// const updateUser = async (req, res) => {
//     try {
//         const user = await User.findOne({
//             where: {
//                 [Op.or]: [
//                     { userId: req.params.id },
//                     { username: req.params.id },
//                     { email: req.params.id },
//                 ],
//             },
//         });

//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         const { password, confirmPassword } = req.body;

//         if (password && password !== confirmPassword) {
//             return res.status(400).json({ success: false, message: "Passwords do not match" });
//         }

//         if (password) {
//             const saltround = 10;
//             const hashpassword = await bcrypt.hash(password, saltround);

//             await User.update({
//                 password: hashpassword,
//             }, {
//                 where: {
//                     userId: user.userId,
//                 },
//             });

//             return res.status(200).json({ success: true, message: "Password updated successfully" });
//         }

//         return res.status(400).json({ success: false, message: "Password is required for update" });
//     } catch (error) {
//         console.error('Error updating user information:', error);
//         return res.status(500).json({ success: false, message: "Error updating user information" });
//     }
// };
const updateUser = async (req, res) => {
    try {
        // Find the user by userId, username, or email
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { userId: req.params.id },
                    { username: req.params.id },
                    { email: req.params.id }
                ]
            }
        });

        // If user not found, return 404
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Extract password-related fields from the request body
        const { password, confirmPassword } = req.body;

        // Check if the passwords match
        if (password !== confirmPassword) return res.status(400).json({ success: false, message: "Passwords do not match" });

        // If password is provided and matches, update the user's password
        if (password) {
            const saltround = 10;
            const hashpassword = await bcrypt.hash(password, saltround);

            await User.update({
                password: hashpassword,
            }, {
                where: {
                    id: user.id  // Use 'id' instead of 'userId'
                }
            });

            return res.status(200).json({ success: true, message: "Password updated successfully" });
        }

        // If password is not provided, return an error
        return res.status(400).json({ success: false, message: "Password is required for update" });
    } catch (error) {
        console.error('Error updating user information:', error);
        return res.status(500).json({ success: false, message: "Error updating user information" });
    }
};

const updateUserstatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.userrole !== 'Admin') {
            return res.status(403).json({ message: 'Permission denied' });
        }

        await user.update({ status });
        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ message: 'Failed to update user status' });
    }
};

// const deleteUser = async (req, res) => {
//     try {
//         const user = await User.findOne({
//             where: {
//                 [Op.or]: [
//                     { userId: req.params.id },
//                     { username: req.params.id },
//                     { email: req.params.id },
//                 ],
//             },
//         });

//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         await User.destroy({
//             where: {
//                 userId: user.userId,
//             },
//         });

//         res.status(200).json({ success: true, message: "User deleted successfully" });
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         res.status(500).json({ success: false, message: "Error deleting user" });
//     }
// };

const deleteUser = async (req, res) => {
    try {
        // Find the user by userId, username, or email
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { userId: req.params.id },
                    { username: req.params.id },
                    { email: req.params.id }
                ]
            }
        });

        // If user not found, return 404
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Delete the user
        await User.destroy({
            where: {
                id: user.id  // Use 'id' instead of 'userId'
            }
        });

        // Return success message
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, message: "Error deleting user" });
    }
};


module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser, updateUserstatus };