// ProfileController.js
const { PatientProfile, User: PatientUser } = require('../models/AllModel');
const { DoctorProfile, User: DoctorUser } = require('../models/AllModel');
const { AdminProfile, User: AdminUser } = require('../models/AllModel');

const getAllProfiles = async (req, res) => {
    try {
        const patientProfiles = await PatientProfile.findAll({
            include: [{ model: PatientUser, attributes: ['userId', 'username', 'email', 'role'] }],
        });

        const doctorProfiles = await DoctorProfile.findAll({
            include: [{ model: DoctorUser, attributes: ['userId', 'username', 'email', 'role'] }],
        });

        const adminProfiles = await AdminProfile.findAll({
            include: [{ model: AdminUser, attributes: ['userId', 'username', 'email', 'role'] }],
        });

        const allProfiles = {
            patients: patientProfiles.map(profile => profile.toJSON()),
            doctors: doctorProfiles.map(profile => profile.toJSON()),
            admins: adminProfiles.map(profile => profile.toJSON()),
        };

        return res.status(200).json(allProfiles);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return res.status(500).json({ message: 'Failed to fetch profiles' });
    }
};

const getProfileById = async (req, res) => {
    const { profileType, id } = req.params;

    try {
        let profile, user;

        switch (profileType) {
            case 'patient':
                profile = await PatientProfile.findOne({
                    where: { patientProfileId: id },
                    include: [{ model: PatientUser, attributes: ['userId', 'username', 'email', 'role'] }],
                });
                break;

            case 'doctor':
                profile = await DoctorProfile.findOne({
                    where: { doctorProfileId: id },
                    include: [{ model: DoctorUser, attributes: ['userId', 'username', 'email', 'role'] }],
                });
                break;

            case 'admin':
                profile = await AdminProfile.findOne({
                    where: { adminProfileId: id },
                    include: [{ model: AdminUser, attributes: ['userId', 'username', 'email', 'role'] }],
                });
                break;

            default:
                return res.status(400).json({ message: 'Invalid profile type' });
        }

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        return res.status(200).json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        return res.status(500).json({ message: 'Failed to fetch profile' });
    }
};


module.exports = { getAllProfiles, getProfileById };





// // ProfileController.js
// const { PatientProfile, User: PatientUser } = require('../models/PatientModel');
// const { DoctorProfile, User: DoctorUser } = require('../models/DoctorModel');
// const { AdminProfile, User: AdminUser } = require('../models/AdminModel');

// const getAllProfiles = async (req, res) => {
//     try {
//         const patientProfiles = await PatientProfile.findAll({
//             include: [{ model: PatientUser, as: 'user' }],
//         });

//         const doctorProfiles = await DoctorProfile.findAll({
//             include: [{ model: DoctorUser, as: 'user' }],
//         });

//         const adminProfiles = await AdminProfile.findAll({
//             include: [{ model: AdminUser, as: 'user' }],
//         });

//         const allProfiles = {
//             patients: patientProfiles.map(profile => profile.toJSON()),
//             doctors: doctorProfiles.map(profile => profile.toJSON()),
//             admins: adminProfiles.map(profile => profile.toJSON()),
//         };

//         return res.status(200).json(allProfiles);
//     } catch (error) {
//         console.error('Error fetching profiles:', error);
//         return res.status(500).json({ message: 'Failed to fetch profiles' });
//     }
// };

// module.exports = { getAllProfiles };









// // ProfileController.js
// const { PatientProfile, User: PatientUser } = require('../models/PatientModel');
// const { DoctorProfile, User: DoctorUser } = require('../models/DoctorModel');
// const { AdminProfile, User: AdminUser } = require('../models/AdminModel');

// const getAllProfiles = async (req, res) => {
//     try {
//         const patientProfiles = await PatientProfile.findAll({
//             include: [{ model: PatientUser, as: 'User' }],
//         });

//         const doctorProfiles = await DoctorProfile.findAll({
//             include: [{ model: DoctorUser, as: 'User' }],
//         });

//         const adminProfiles = await AdminProfile.findAll({
//             include: [{ model: AdminUser, as: 'User' }],
//         });

//         const allProfiles = {
//             patients: patientProfiles.map(profile => profile.toJSON()),
//             doctors: doctorProfiles.map(profile => profile.toJSON()),
//             admins: adminProfiles.map(profile => profile.toJSON()),
//         };

//         return res.status(200).json(allProfiles);
//     } catch (error) {
//         console.error('Error fetching profiles:', error);
//         return res.status(500).json({ message: 'Failed to fetch profiles' });
//     }
// };

// module.exports = { getAllProfiles };











// // ProfileController.js
// const { PatientProfile, User: PatientUser } = require('../models/PatientModel');
// const { DoctorProfile, User: DoctorUser } = require('../models/DoctorModel');
// const { AdminProfile, User: AdminUser } = require('../models/AdminModel');

// const getAllProfiles = async (req, res) => {
//     try {
//         const patientProfiles = await PatientProfile.findAll({
//             include: [PatientUser],
//         });

//         const doctorProfiles = await DoctorProfile.findAll({
//             include: [DoctorUser],
//         });

//         const adminProfiles = await AdminProfile.findAll({
//             include: [AdminUser],
//         });

//         const allProfiles = {
//             patients: patientProfiles.map(profile => ({
//                 ...profile.toJSON(),
//                 User: profile.User ? profile.User.toJSON() : null,
//             })),
//             doctors: doctorProfiles.map(profile => ({
//                 ...profile.toJSON(),
//                 User: profile.User ? profile.User.toJSON() : null,
//             })),
//             admins: adminProfiles.map(profile => ({
//                 ...profile.toJSON(),
//                 User: profile.User ? profile.User.toJSON() : null,
//             })),
//         };

//         return res.status(200).json(allProfiles);
//     } catch (error) {
//         console.error('Error fetching profiles:', error);
//         return res.status(500).json({ message: 'Failed to fetch profiles' });
//     }
// };

// module.exports = { getAllProfiles };





// // ProfileController.js
// const { PatientProfile, User: PatientUser } = require('../models/PatientModel');
// const { DoctorProfile, User: DoctorUser } = require('../models/DoctorModel');
// const { AdminProfile, User: AdminUser } = require('../models/AdminModel');

// const getAllProfiles = async (req, res) => {
//     try {
//         const patientProfiles = await PatientProfile.findAll({
//             include: [{ model: PatientUser, attributes: ['userId', 'username', 'email', 'role'] }],
//         });

//         const doctorProfiles = await DoctorProfile.findAll({
//             include: [{ model: DoctorUser, attributes: ['userId', 'username', 'email', 'role'] }],
//         });

//         const adminProfiles = await AdminProfile.findAll({
//             include: [{ model: AdminUser, attributes: ['userId', 'username', 'email', 'role'] }],
//         });

//         const allProfiles = {
//             patients: patientProfiles.map(profile => ({
//                 ...profile.toJSON(),
//                 User: profile.User.toJSON(),
//             })),
//             doctors: doctorProfiles.map(profile => ({
//                 ...profile.toJSON(),
//                 User: profile.User.toJSON(),
//             })),
//             admins: adminProfiles.map(profile => ({
//                 ...profile.toJSON(),
//                 User: profile.User.toJSON(),
//             })),
//         };

//         return res.status(200).json(allProfiles);
//     } catch (error) {
//         console.error('Error fetching profiles:', error);
//         return res.status(500).json({ message: 'Failed to fetch profiles' });
//     }
// };

// module.exports = { getAllProfiles };










// // ProfileController.js
// const { PatientProfile, User: PatientUser } = require('../models/PatientModel');
// const { DoctorProfile, User: DoctorUser } = require('../models/DoctorModel');
// const { AdminProfile, User: AdminUser } = require('../models/AdminModel');

// const getAllProfiles = async (req, res) => {
//     try {
//         const patientProfiles = await PatientProfile.findAll({
//             include: [{ model: PatientUser, attributes: ['userId', 'username', 'email', 'role'] }],
//         });

//         const doctorProfiles = await DoctorProfile.findAll({
//             include: [{ model: DoctorUser, attributes: ['userId', 'username', 'email', 'role'] }],
//         });

//         const adminProfiles = await AdminProfile.findAll({
//             include: [{ model: AdminUser, attributes: ['userId', 'username', 'email', 'role'] }],
//         });

//         const allProfiles = {
//             patients: patientProfiles,
//             doctors: doctorProfiles,
//             admins: adminProfiles,
//         };

//         return res.status(200).json(allProfiles);
//     } catch (error) {
//         console.error('Error fetching profiles:', error);
//         return res.status(500).json({ message: 'Failed to fetch profiles' });
//     }
// };

// module.exports = { getAllProfiles };





// // ProfileController.js Working ///////////////
// const { PatientProfile } = require('../models/PatientModel');
// const { DoctorProfile } = require('../models/DoctorModel');
// const { AdminProfile } = require('../models/AdminModel');

// const getAllProfiles = async (req, res) => {
//     try {
//         const patientProfiles = await PatientProfile.findAll();
//         const doctorProfiles = await DoctorProfile.findAll();
//         const adminProfiles = await AdminProfile.findAll();

//         const allProfiles = {
//             patients: patientProfiles,
//             doctors: doctorProfiles,
//             admins: adminProfiles,
//         };

//         return res.status(200).json(allProfiles);
//     } catch (error) {
//         console.error('Error fetching profiles:', error);
//         return res.status(500).json({ message: 'Failed to fetch profiles' });
//     }
// };

// module.exports = { getAllProfiles };



// ProfileController.js
// const { PatientProfile } = require('../models/PatientModel');
// const { DoctorProfile } = require('../models/DoctorModel');
// const { AdminProfile } = require('../models/AdminModel');

// const createProfile = async (userId, name, phoneNumber, address, age, height, weight, specialization, education, licenseNumber, role) => {
//     try {
//         let profile;

//         if (role === 'Patient') {
//             profile = await PatientProfile.create({
//                 userId: userId,
//                 name: name,
//                 phoneNumber: phoneNumber,
//                 address: address,
//                 age: age,
//                 height: height,
//                 weight: weight,
//             });
//         } else if (role === 'Doctor') {
//             profile = await DoctorProfile.create({
//                 userId: userId,
//                 name: name,
//                 phoneNumber: phoneNumber,
//                 address: address,
//                 specialization: specialization,
//                 education: education,
//                 licenseNumber: licenseNumber,
//             });
//         } else if (role === 'Admin') {
//             profile = await AdminProfile.create({
//                 userId: userId,
//                 name: name,
//                 phoneNumber: phoneNumber,
//                 address: address,
//             });
//         } else {
//             throw new Error('Invalid role specified');
//         }

//         console.log('Profile created successfully');
//         return profile;
//     } catch (error) {
//         console.error('Error creating profile:', error);
//         throw error;
//     }
// };

// const updateProfile = async (userId, name, phoneNumber, address, age, height, weight, specialization, education, licenseNumber, role) => {
//     try {
//         let updatedRows;

//         if (role === 'Patient') {
//             [updatedRows] = await PatientProfile.update(
//                 {
//                     name: name,
//                     phoneNumber: phoneNumber,
//                     address: address,
//                     age: age,
//                     height: height,
//                     weight: weight,
//                 },
//                 {
//                     where: { userId: userId },
//                 }
//             );
//         } else if (role === 'Doctor') {
//             [updatedRows] = await DoctorProfile.update(
//                 {
//                     name: name,
//                     phoneNumber: phoneNumber,
//                     address: address,
//                     specialization: specialization,
//                     education: education,
//                     licenseNumber: licenseNumber,
//                 },
//                 {
//                     where: { userId: userId },
//                 }
//             );
//         } else if (role === 'Admin') {
//             [updatedRows] = await AdminProfile.update(
//                 {
//                     name: name,
//                     phoneNumber: phoneNumber,
//                     address: address,
//                 },
//                 {
//                     where: { userId: userId },
//                 }
//             );
//         } else {
//             throw new Error('Invalid role specified');
//         }

//         if (updatedRows === 0) {
//             throw new Error('Profile not found');
//         }

//         console.log('Profile updated successfully');
//         return true;
//     } catch (error) {
//         console.error('Error updating profile:', error);
//         throw error;
//     }
// };

// module.exports = { createProfile, updateProfile };


// // controllers/ProfileController.js
// const { User } = require('../models/UserModel'); // Adjust the path accordingly
// // const { AdminProfile, DoctorProfile, PatientProfile } = require('../models');
// const { AdminProfile } = require("../models/AdminModel.js");
// const { DoctorProfile } = require("../models/DoctorModel.js");
// const { PatientProfile } = require("../models/PatientModel.js");

// const updateProfile = async (req, res) => {
//   const { userId, name, phoneNumber, address, specialization, education, licenseNumber, age, height, weight } = req.body;

//   try {
//     // Find the user
//     const user = await User.findByPk(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     let updatedProfile;

//     // Update the profile based on the user's role
//     switch (user.role) {
//       case 'Admin':
//         updatedProfile = await AdminProfile.update({ name, phoneNumber, address }, { where: { userId } });
//         break;
//       case 'Doctor':
//         updatedProfile = await DoctorProfile.update(
//           { name, phoneNumber, address, specialization, education, licenseNumber },
//           { where: { userId } }
//         );
//         break;
//       case 'Patient':
//         updatedProfile = await PatientProfile.update({ name, phoneNumber, address, age, height, weight }, { where: { userId } });
//         break;
//       default:
//         return res.status(400).json({ message: 'Invalid role' });
//     }

//     if (updatedProfile[0] === 0) {
//       return res.status(404).json({ message: `${user.role} profile not found` });
//     }

//     console.log(`${user.role} profile updated successfully`);

//     return res.status(200).json({ message: 'Profile updated successfully' });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// module.exports = { updateProfile };




// // const { User } = require('../models/UserModel'); // Adjust the path accordingly
// // // const { AdminProfile, DoctorProfile, PatientProfile } = require('../models');
// // const { AdminProfile } = require("../models/AdminModel.js");
// // const { DoctorProfile } = require("../models/DoctorModel.js");
// // const { PatientProfile } = require("../models/PatientModel.js");

// // const createProfile = async (user, profileData) => {
// //     switch (user.role) {
// //         case 'Admin':
// //             return await AdminProfile.create({ userId: user.userId, ...profileData });
// //         case 'Doctor':
// //             return await DoctorProfile.create({ userId: user.userId, ...profileData });
// //         case 'Patient':
// //             return await PatientProfile.create({ userId: user.userId, ...profileData });
// //         default:
// //             throw new Error('Invalid role');
// //     }
// // };

// // const updateExistingProfile = async (user, existingProfile, newData) => {
// //     switch (user.role) {
// //         case 'Admin':
// //             return await AdminProfile.update({ ...newData }, { where: { userId: user.userId } });
// //         case 'Doctor':
// //             return await DoctorProfile.update({ ...newData }, { where: { userId: user.userId } });
// //         case 'Patient':
// //             return await PatientProfile.update({ ...newData }, { where: { userId: user.userId } });
// //         default:
// //             throw new Error('Invalid role');
// //     }
// // };

// // const updateProfile = async (req, res) => {
// //     const { userId, name, phoneNumber, address, specialization, education, licenseNumber, age, height, weight } = req.body;

// //     try {
// //         // Find the user
// //         const user = await User.findByPk(userId);

// //         if (!user) {
// //             return res.status(404).json({ message: 'User not found' });
// //         }

// //         let profile;

// //         // Check if the profile already exists
// //         const existingProfile = await getProfileByuserId(user.userId);

// //         if (existingProfile) {
// //             // Update the existing profile
// //             profile = await updateExistingProfile(user, existingProfile, req.body);
// //         } else {
// //             // Create a new profile
// //             profile = await createProfile(user, req.body);
// //         }

// //         console.log(`${user.role} profile updated successfully`);

// //         return res.status(200).json({ message: 'Profile updated successfully' });
// //     } catch (error) {
// //         console.error('Error updating profile:', error);
// //         return res.status(500).json({ message: 'Internal server error' });
// //     }
// // };

// // const getProfileByuserId = async (userId) => {
// //     // Implement logic to retrieve the profile based on the user's role
// //     // For example, you might use DoctorProfile.findOne({ where: { userId: userId } });
// //     // Adjust the logic based on your database schema and ORM queries
// //     return null; // Replace this with the actual query
// // };

// // module.exports = { updateProfile };



// // // // // const { User, AdminProfile, DoctorProfile, PatientProfile } = require('../models');
// // // const { User } = require("../models/UserModel.js");
// // // const { AdminProfile } = require("../models/AdminModel.js");
// // // const { DoctorProfile } = require("../models/DoctorModel.js");
// // // const { PatientProfile } = require("../models/PatientModel.js");

// // // const updateProfile = async (req, res) => {
// // //     const { userId, name, phoneNumber, address, specialization, education, licenseNumber, age, height, weight } = req.body;

// // //     try {
// // //         // Find the user
// // //         const user = await User.findByPk(userId);

// // //         if (!user) {
// // //             return res.status(404).json({ message: 'User not found' });
// // //         }

// // //         let updatedProfile;

// // //         // Update the profile based on the user's role
// // //         switch (user.role) {
// // //             case 'Admin':
// // //                 updatedProfile = await AdminProfile.update({ name, phoneNumber, address }, { where: { userId } });
// // //                 break;
// // //             case 'Doctor':
// // //                 updatedProfile = await DoctorProfile.update({ name, phoneNumber, address, specialization, education, licenseNumber }, { where: { userId } });
// // //                 break;
// // //             case 'Patient':
// // //                 updatedProfile = await PatientProfile.update({ name, phoneNumber, address, age, height, weight }, { where: { userId } });
// // //                 break;
// // //             default:
// // //                 return res.status(400).json({ message: 'Invalid role' });
// // //         }

// // //         if (updatedProfile[0] === 0) {
// // //             return res.status(404).json({ message: `${user.role} profile not found` });
// // //         }

// // //         console.log(`${user.role} profile updated successfully`);

// // //         return res.status(200).json({ message: 'Profile updated successfully' });
// // //     } catch (error) {
// // //         console.error('Error updating profile:', error);
// // //         return res.status(500).json({ message: 'Internal server error' });
// // //     }
// // // };

// // // module.exports = { updateProfile };




// // // profile.controller.js
// // // const { User, AdminProfile, DoctorProfile, PatientProfile } = require('../models');
// // // const { UserModel, AdminModel, DoctorModel, PatientModel } = require("../models");
// // // const  {User} = require("../models/UserModel.js"); // Assuming you have both User and Doctor models
// // // const  {PatientProfile} = require("../models/PatientModel.js"); // Assuming you have both User and Doctor models
// // // const  {DoctorProfile} = require("../models/DoctorModel.js"); // Assuming you have both User and Doctor models
// // // const  {AdminProfile} = require("../models/AdminModel.js"); // Assuming you have both User and Doctor models

// // // const updateProfile = async (req, res) => {
// // //     const { userId, name, phoneNumber, address, specialization, education, licenseNumber, age, height, weight } = req.body;

// // //     try {
// // //         // Find the user
// // //         const user = await User.findByPk(userId);

// // //         if (!user) {
// // //             return res.status(404).json({ message: 'User not found' });
// // //         }

// // //         // Update the profile based on the user's role
// // //         switch (user.role) {
// // //             case 'Admin':
// // //                 await AdminProfile.update({ name, phoneNumber, address }, { where: { userId } });
// // //                 break;
// // //             case 'Doctor':
// // //                 await DoctorProfile.update({ name, phoneNumber, address, specialization, education, licenseNumber }, { where: { userId } });
// // //                 break;
// // //             case 'Patient':
// // //                 await PatientProfile.update({ name, phoneNumber, address, age, height, weight }, { where: { userId } });
// // //                 break;
// // //             default:
// // //                 return res.status(400).json({ message: 'Invalid role' });
// // //         }

// // //         return res.status(200).json({ message: 'Profile updated successfully' });
// // //     } catch (error) {
// // //         console.error('Error updating profile:', error);
// // //         return res.status(500).json({ message: 'Internal server error' });
// // //     }
// // // };

// // // module.exports = { updateProfile };

// // // const { User } = require("../models/UserModel.js");

// // // const updateProfile = async (req, res) => {
// // //     const { userId, name, phoneNumber, address, specialization, education, licenseNumber, age, height, weight } = req.body;

// // //     try {
// // //         // Find the user
// // //         const user = await User.findByPk(userId);

// // //         if (!user) {
// // //             return res.status(404).json({ message: 'User not found' });
// // //         }

// // //         // Rest of the code...
// // //     } catch (error) {
// // //         console.error('Error updating profile:', error);
// // //         return res.status(500).json({ message: 'Internal server error' });
// // //     }
// // // };

// // // module.exports = { updateProfile };