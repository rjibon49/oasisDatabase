const { AdminProfile, User } = require('../models/AllModel');

const createAdminProfile = async (req, res) => {
    const { userId, name, phoneNumber, address } = req.body;

    try {
        // Check if the Admin profile already exists
        const existingProfile = await AdminProfile.findOne({ where: { userId } });

        if (existingProfile) {
            return res.status(409).json({ message: 'Admin profile already exists' });
        }

        // Create the Admin profile
        const newProfile = await AdminProfile.create({
            userId,
            name,
            phoneNumber,
            address,
        });

        return res.status(201).json({ message: 'Admin profile created successfully' });
    } catch (error) {
        console.error('Error creating Admin profile:', error);
        return res.status(500).json({ message: 'Failed to create Admin profile' });
    }
};

const updateAdminProfile = async (req, res) => {
    const { userId, name, phoneNumber, address } = req.body;

    try {
        // Find the Admin profile
        const profile = await AdminProfile.findOne({ where: { userId } });

        if (!profile) {
            return res.status(404).json({ message: 'Admin profile not found' });
        }

        // Update the Admin profile
        await profile.update({
            name,
            phoneNumber,
            address,
        });

        return res.status(200).json({ message: 'Admin profile updated successfully' });
    } catch (error) {
        console.error('Error updating Admin profile:', error);
        return res.status(500).json({ message: 'Failed to update Admin profile' });
    }
};

// Get All Doctor Profile

const getAdminProfiles = async (req, res) => {
    try {
        const adminProfile = await AdminProfile.findAll({
            include: [{
                model: User,
                attributes: ['userId', 'username', 'email', 'role'],
            }],
        });

        return res.status(200).json(adminProfile);
    } catch (error) {
        console.error('Error fetching Doctor profiles:', error);
        return res.status(500).json({ message: 'Failed to fetch Doctor profiles' });
    }
};

// Get Doctor Profile By ID

const getAdminProfileById = async (req, res) => {
    const { id } = req.params; // Assuming the patient ID is passed as a route parameter

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const adminProfile = await AdminProfile.findOne({
            where: { adminProfileId: id }, // Adjust the field based on your model
            include: [{
                model: User,
                attributes: ['userId', 'username', 'email', 'role'],
            }],
        });

        if (!adminProfile) {
            return res.status(404).json({ message: 'Admin profile not found' });
        }

        return res.status(200).json(adminProfile);
    } catch (error) {
        console.error('Error fetching ADmin profile:', error);
        return res.status(500).json({ message: 'Failed to fetch Admin profile' });
    }
};

module.exports = { createAdminProfile, updateAdminProfile, getAdminProfiles, getAdminProfileById };






// const { Op } = require('sequelize');
// const  {User} = require("../models/UserModel.js"); // Assuming you have both User and Doctor models
// const  {Patient} = require("../models/PatientModel.js"); // Assuming you have both User and Doctor models
// const  {Doctor} = require("../models/DoctorModel.js"); // Assuming you have both User and Doctor models
// const  {Admin} = require("../models/AdminModel.js"); // Assuming you have both User and Doctor models

// const updaterole = async (req, res) => {
//     const { userId, role } = req.body;

//     try {
//         // Find the user by userId
//         const user = await User.findByPk(userId);

//         if (!user) return res.status(404).json({ message: 'User not found' });

//         // Check if the requester is an admin
//         // Note: You should add proper authentication and authorization checks here
//         const isAdmin = await Admin.findOne({ where: { userId: req.authuserId } });

//         if (!isAdmin) {
//             return res.status(403).json({ message: 'Only admins can update user roles' });
//         }

//         // Update the user's role based on the request
//         await User.update({ role }, { where: { id: userId } });

//         // If the user is a patient, doctor, or admin, update their corresponding profile
//         if (role === 'Patient') {
//             await Patient.update({ /* update patient fields */ }, { where: { userId } });
//         } else if (role === 'Doctor') {
//             await Doctor.update({ /* update doctor fields */ }, { where: { userId } });
//         } else if (role === 'Admin') {
//             await Admin.update({ /* update admin fields */ }, { where: { userId } });
//         }

//         return res.status(200).json({ message: 'User role updated successfully' });
//     } catch (error) {
//         console.error('Error updating user role:', error);
//         return res.status(500).json({ message: 'Error updating user role' });
//     }
// };

// // const updateAdminProfile = async (req, res) => {
// //     const { userId, name, phoneNumber, address } = req.body;

// //     try {
// //         // Check if the user exists
// //         const user = await User.findByPk(userId);

// //         if (!user) {
// //             return res.status(404).json({ message: 'User not found' });
// //         }

// //         // Check if the requester is the same user or an admin
// //         const isAdmin = await Admin.findOne({ where: { userId: req.authuserId } });

// //         if (!isAdmin && user.id !== req.authuserId) {
// //             return res.status(403).json({ message: 'You are not allowed to update this profile' });
// //         }

// //         // Update the admin profile
// //         const [updatedRows] = await Admin.update(
// //             { name, phoneNumber, address },
// //             { where: { userId } }
// //         );

// //         if (updatedRows === 0) {
// //             return res.status(404).json({ message: 'Admin profile not found' });
// //         }

// //         return res.status(200).json({ message: 'Admin profile updated successfully' });
// //     } catch (error) {
// //         console.error('Error updating admin profile:', error);
// //         return res.status(500).json({ message: 'Error updating admin profile' });
// //     }
// // };

// // const updateUserProfile = async (req, res) => {
// const updateAdminProfile = async (req, res) => {
//     const { userId, name, phoneNumber, address } = req.body;

//     try {
//         // Check if the user exists
//         const user = await User.findByPk(userId);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Check if the requester is the same user or an admin
//         const isAdmin = await Admin.findOne({ where: { userId: req.authuserId } });

//         // Check the user's role
//         switch (user.role) {
//             case 'Admin':
//                 // Update the admin profile
//                 const [adminUpdatedRows] = await Admin.update(
//                     { name, phoneNumber, address },
//                     { where: { userId } }
//                 );

//                 if (adminUpdatedRows === 0) {
//                     return res.status(404).json({ message: 'Admin profile not found' });
//                 }

//                 return res.status(200).json({ message: 'Admin profile updated successfully' });

//             // case 'Doctor':
//                 // Update the doctor profile (similar to the admin case)
//                 // ...

//                 // break;

//             // case 'Patient':
//                 // Update the patient profile (similar to the admin case)
//                 // ...

//                 // break;

//             // Add more cases for other roles as needed

//             default:
//                 return res.status(403).json({ message: 'Unsupported role' });
//         }
//     } catch (error) {
//         console.error('Error updating user profile:', error);
//         return res.status(500).json({ message: 'Error updating user profile' });
//     }
// };

// module.exports = { updaterole, updateAdminProfile };