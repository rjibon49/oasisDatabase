// PatientProfileController.js
const { PatientProfile, User } = require('../models/AllModel');

const createPatientProfile = async (userId, name, phoneNumber, address, age, height, weight) => {
    try {
        const patientProfile = await PatientProfile.create({
            userId: userId,
            name: name,
            phoneNumber: phoneNumber,
            address: address,
            age: age,
            height: height,
            weight: weight,
        });

        console.log('Patient profile created successfully');
        return patientProfile;
    } catch (error) {
        console.error('Error creating patient profile:', error);
        throw error;
    }
};

const updatePatientProfile = async (userId, name, phoneNumber, address, age, height, weight) => {
    try {
        const [updatedRows] = await PatientProfile.update(
            {
                name: name,
                phoneNumber: phoneNumber,
                address: address,
                age: age,
                height: height,
                weight: weight,
            },
            {
                where: { userId: userId },
            }
        );

        if (updatedRows === 0) {
            throw new Error('Patient profile not found');
        }

        console.log('Patient profile updated successfully');
        return true;
    } catch (error) {
        console.error('Error updating patient profile:', error);
        throw error;
    }
};

// Get All Patient Profile

const getPatientProfiles = async (req, res) => {
    try {
        const patientProfiles = await PatientProfile.findAll({
            include: [{
                model: User,
                attributes: ['userId', 'username', 'email', 'role'],
            }],
        });

        return res.status(200).json(patientProfiles);
    } catch (error) {
        console.error('Error fetching patient profiles:', error);
        return res.status(500).json({ message: 'Failed to fetch patient profiles' });
    }
};

// Get Patient Profile By ID

const getPatientProfileById = async (req, res) => {
    const { id } = req.params; // Assuming the patient ID is passed as a route parameter

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const patientProfile = await PatientProfile.findOne({
            where: { patientProfileId: id }, // Adjust the field based on your model
            include: [{
                model: User,
                attributes: ['userId', 'username', 'email', 'role'],
            }],
        });

        if (!patientProfile) {
            return res.status(404).json({ message: 'Patient profile not found' });
        }

        return res.status(200).json(patientProfile);
    } catch (error) {
        console.error('Error fetching patient profile:', error);
        return res.status(500).json({ message: 'Failed to fetch patient profile' });
    }
};


module.exports = { createPatientProfile, updatePatientProfile, getPatientProfiles, getPatientProfileById };



// // ProfileController.js
// const { PatientProfile } = require('../models/PatientModel');

// const createPatientProfile = async (userId, profileData) => {
//     try {
//         const patientProfile = await PatientProfile.create({
//             userId: userId,
//             ...profileData,
//         });

//         return patientProfile;
//     } catch (error) {
//         console.error('Error creating patient profile:', error);
//         throw error;
//     }
// };

// module.exports = { createPatientProfile };