const { DoctorProfile, User } = require('../models/AllModel');

const createDoctorProfile = async (req, res) => {
    const { userId, name, phoneNumber, address, specialization, education, licenseNumber } = req.body;

    try {
        // Check if the user exists
        const existingUser = await User.findByPk(userId);

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the doctor profile already exists
        const existingProfile = await DoctorProfile.findOne({ where: { userId } });

        if (existingProfile) {
            return res.status(409).json({ message: 'Doctor profile already exists' });
        }

        // Create the doctor profile
        const newProfile = await DoctorProfile.create({
            userId,
            name,
            phoneNumber,
            address,
            specialization,
            education,
            licenseNumber,
        });

        return res.status(201).json({ message: 'Doctor profile created successfully', profile: newProfile });
    } catch (error) {
        console.error('Error creating doctor profile:', error);
        return res.status(500).json({ message: 'Failed to create doctor profile' });
    }
};

const updateDoctorProfile = async (req, res) => {
    const { userId, name, phoneNumber, address, specialization, education, licenseNumber } = req.body;

    try {
        // Find the doctor profile
        const profile = await DoctorProfile.findOne({ where: { userId } });

        if (!profile) {
            return res.status(404).json({ message: 'Doctor profile not found' });
        }

        // Update the doctor profile
        await profile.update({
            name,
            phoneNumber,
            address,
            specialization,
            education,
            licenseNumber,
        });

        return res.status(200).json({ message: 'Doctor profile updated successfully' });
    } catch (error) {
        console.error('Error updating doctor profile:', error);
        return res.status(500).json({ message: 'Failed to update doctor profile' });
    }
};

// Get All Doctor Profile

const getDoctorProfiles = async (req, res) => {
    try {
        const doctorProfile = await DoctorProfile.findAll({
            include: [{
                model: User,
                attributes: ['userId', 'username', 'email', 'role'],
            }],
        });

        return res.status(200).json(doctorProfile);
    } catch (error) {
        console.error('Error fetching Doctor profiles:', error);
        return res.status(500).json({ message: 'Failed to fetch Doctor profiles' });
    }
};

// Get Doctor Profile By ID

const getDoctorProfileById = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const doctorProfile = await DoctorProfile.findOne({
            where: { doctorProfileId: id },
            include: [{
                model: User,
                attributes: ['userId', 'username', 'email', 'role'],
            }],
        });

        if (!doctorProfile) {
            return res.status(404).json({ message: 'Doctor profile not found' });
        }

        return res.status(200).json(doctorProfile);
    } catch (error) {
        console.error('Error fetching Doctor profile:', error);
        return res.status(500).json({ message: 'Failed to fetch Doctor profile' });
    }
};

module.exports = { createDoctorProfile, updateDoctorProfile, getDoctorProfiles, getDoctorProfileById };



// const { Op } = require('sequelize');
// const  {User} = require("../models/UserModel.js"); // Assuming you have both User and Doctor models
// const  {Doctor} = require("../models/DoctorModel.js"); // Assuming you have both User and Doctor models

// const updateDoctorProfile = async (req, res) => {
//     const { userId, name, specialization, education, licenseNumber } = req.body;

//     try {
//         // Check if the user exists
//         const user = await User.findByPk(userId);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Check if the requester is the same user
//         if (user.id !== req.authuserId) {
//             return res.status(403).json({ message: 'You are not allowed to update this profile' });
//         }

//         // Update the doctor profile
//         const [updatedRows] = await Doctor.update(
//             { name, specialization, education, licenseNumber },
//             { where: { userId } }
//         );

//         if (updatedRows === 0) {
//             return res.status(404).json({ message: 'Doctor profile not found' });
//         }

//         return res.status(200).json({ message: 'Doctor profile updated successfully' });
//     } catch (error) {
//         console.error('Error updating doctor profile:', error);
//         return res.status(500).json({ message: 'Error updating doctor profile' });
//     }
// };

// module.exports = { updateDoctorProfile };