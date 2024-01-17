// // UpdateProfileController.js

// const  User  = require('../models/UserModel'); // Adjust the path accordingly
// const AdminProfile = require("../models/AdminModel.js");
// const  DoctorProfile = require("../models/DoctorModel.js");
// const  PatientProfile  = require("../models/PatientModel.js");


// const updateAdminProfile = async (userId, /* other fields */) => {
//   try {
//     return await AdminProfile.update({ /* update fields */ }, { where: { userId } });
//   } catch (error) {
//     console.error("Error updating Admin profile:", error);
//     throw new Error("Error updating Admin profile");
//   }
// };

// const updateDoctorProfile = async (userId, /* other fields */) => {
//   try {
//     return await DoctorProfile.update({ /* update fields */ }, { where: { userId } });
//   } catch (error) {
//     console.error("Error updating Doctor profile:", error);
//     throw new Error("Error updating Doctor profile");
//   }
// };

// const updatePatientProfile = async (userId, /* other fields */) => {
//   try {
//     return await PatientProfile.update({ /* update fields */ }, { where: { userId } });
//   } catch (error) {
//     console.error("Error updating Patient profile:", error);
//     throw new Error("Error updating Patient profile");
//   }
// };

// const updateProfile = async (req, res) => {
//   const { userId } = req.body;

//   try {
//     const user = await User.findByPk(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     let updatedProfile;

//     switch (user.role) {
//       case "Admin":
//         updatedProfile = await updateAdminProfile(userId, /* other fields */);
//         break;
//       case "Doctor":
//         updatedProfile = await updateDoctorProfile(userId, /* other fields */);
//         break;
//       case "Patient":
//         updatedProfile = await updatePatientProfile(userId, /* other fields */);
//         break;
//       default:
//         return res.status(400).json({ message: "Invalid role" });
//     }

//     if (updatedProfile[0] === 0) {
//       return res.status(404).json({ message: `${user.role} profile not found` });
//     }

//     console.log(`${user.role} profile updated successfully`);

//     return res.status(200).json({ message: `${user.role} profile updated successfully` });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = { updateProfile };