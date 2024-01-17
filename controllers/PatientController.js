// const { Op } = require('sequelize');
// const  {User} = require("../models/UserModel.js"); // Assuming you have both User and Doctor models
// const  {Patient} = require("../models/PatientModel.js"); // Assuming you have both User and Doctor models

// const updatePatientProfile = async (req, res) => {
//     const { userId, name, phoneNumber, age, address } = req.body;

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

//         // Update the patient profile
//         const [updatedRows] = await Patient.update(
//             { name, phoneNumber, age, address },
//             { where: { userId } }
//         );

//         if (updatedRows === 0) {
//             return res.status(404).json({ message: 'Patient profile not found' });
//         }

//         return res.status(200).json({ message: 'Patient profile updated successfully' });
//     } catch (error) {
//         console.error('Error updating patient profile:', error);
//         return res.status(500).json({ message: 'Error updating patient profile' });
//     }
// };

// module.exports = { updatePatientProfile };