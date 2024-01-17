// const { User } = require('../models/UserModel');
// const { createPatientProfile } = require('./CreatePatController');

// const { PatientProfile } = require('../models/PatientModel'); // Adjust the path accordingly

// const updatePatientProfile = async (req, res) => {
//     const { userId } = req.session; // Assuming you store the user ID in the session

//     try {
//         // Find the user
//         const user = await User.findByPk(userId);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Find or create patient profile
//         let patientProfile = await PatientProfile.findOne({ where: { userId: userId } });

//         if (!patientProfile) {
//             patientProfile = await PatientProfile.create({
//                 userId: userId,
//                 // Add other default values for the patient profile if needed
//             });
//         }

//         // Update patient profile
//         const updatedProfile = await patientProfile.update({
//             name: req.body.name,
//             phoneNumber: req.body.phoneNumber,
//             address: req.body.address,
//             age: req.body.age,
//             height: req.body.height,
//             weight: req.body.weight,
//         });

//         console.log('Patient profile updated successfully');

//         return res.status(200).json({ message: 'Profile updated successfully', updatedProfile });
//     } catch (error) {
//         console.error('Error updating patient profile:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

// module.exports = { updatePatientProfile };