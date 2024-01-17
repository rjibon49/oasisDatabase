const express = require('express');
const router = express.Router();
const passport = require('passport');
const { createUser, getUsers, getUserById, updateUser, deleteUser, updateUserstatus } = require('../controllers/User.js');
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");
const { login, Me, logout } = require("../controllers/Auth.js");

const { createPatientProfile, updatePatientProfile, getPatientProfiles, getPatientProfileById } = require('../controllers/PatientProfileController');
const { createDoctorProfile, updateDoctorProfile, getDoctorProfiles, getDoctorProfileById } = require('../controllers/DoctorProfileController');
const { createAdminProfile, updateAdminProfile, getAdminProfiles, getAdminProfileById } = require('../controllers/AdminProfileController');

const {getAllProfiles, getProfileById} = require("../controllers/GetAllProfile");

const { createSchedule, getAllSchedules, getScheduleById, updateScheduleById, deleteScheduleById } = require('../controllers/ScheduleController.js');

const { createAppointment, updateAppointmentstatus, rescheduleAppointment, cancelAppointment, getAllAppointments } = require('../controllers/AppointmentController.js');

const { createPayment, getAllPayments, getPaymentById, updatePaymentById, deletePaymentById } = require('../controllers/PaymentController.js');

const { createNotification, getNotificationsByuserId, markNotificationAsRead, deleteNotificationById } = require('../controllers/NotificationController.js');
 
// Authentication routes
router.post('/login', login);
router.get('/me', Me);
router.delete('/logout', logout);


// User-related routes
router.post('/users', createUser);
router.get('/users', verifyUser, getUsers);
router.get('/users/:id', adminOnly, getUserById);
router.put('/users/:id', adminOnly, updateUser);
router.put('/users/:id/update-status', adminOnly, updateUserstatus);
router.delete('/users/:id', adminOnly, deleteUser);

// Patient Profile
// Create patient profile route
router.post('/create-patient-profile', createPatientProfile);
// Update patient profile route
router.put('/update-patient-profile', updatePatientProfile);
// Get all patient profile 
router.get('/all-patient-profile', adminOnly, getPatientProfiles);
// Get patient profile by ID
router.get('/all-patient-profile/:id', adminOnly, getPatientProfileById);



// Doctor Profile
// Create Doctor Profile
router.post('/createdoctorprofile', createDoctorProfile);
// Update Doctor Profile
router.put('/update-doctor-profile', updateDoctorProfile);
// Get all patient profile 
router.get('/all-doctor-profile', adminOnly, getDoctorProfiles);
// Get patient profile by ID
router.get('/all-doctor-profile/:id', adminOnly, getDoctorProfileById);


// Admin Profile
// Create Admin Profile
router.post('/create-admin-profile', adminOnly, createAdminProfile);
// Update Admin Profile
router.put('/update-admin-profile', adminOnly, updateAdminProfile);
// Get all Admin profile 
router.get('/all-admin-profile', adminOnly, getAdminProfiles);
// Get Admin profile by ID
router.get('/all-admin-profile/:id', adminOnly, getAdminProfileById);

// All Profile
// Get all profiles
router.get('/all-profiles', adminOnly, getAllProfiles);
// Get profile By Id
router.get('/all-profiles/:profileType/:id', adminOnly, getProfileById);


// Schedule routes
router.post('/schedule', createSchedule);
router.get('/schedules', adminOnly, getAllSchedules);
router.get('/schedules/:id', adminOnly, getScheduleById);
router.put('/schedules/:id', adminOnly, updateScheduleById);
router.delete('/schedules/:id', adminOnly, deleteScheduleById);


// Appointment routes
router.post('/appointment', createAppointment);
router.get('/appointments',  getAllAppointments);
router.put('/appointments/:id', adminOnly, updateAppointmentstatus);
router.put('/reschedule-appointment/:id', adminOnly, rescheduleAppointment);
router.post('/cancel-appointment/:id',  cancelAppointment);
// router.post('/change-appointment-status/:id', adminOnly, changeAppointmentstatus);


// Payment routes
router.post('/payment', adminOnly, createPayment);
router.get('/payments', adminOnly, getAllPayments);
router.get('/payments/:id', adminOnly, getPaymentById);
router.put('/payments/:id', adminOnly, updatePaymentById);
router.delete('/payments/:id', adminOnly, deletePaymentById);


// Notification routes
router.post('/notification', adminOnly, createNotification);
router.get('/notifications/:id', adminOnly, getNotificationsByuserId);
router.put('/notifications/mark-as-read/:id', adminOnly, markNotificationAsRead);
router.delete('/notifications/:id', adminOnly, deleteNotificationById);



module.exports = router;































// const express = require('express');
// const router = express.Router();
// const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/User.js');
// const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");
// const { login, me, logout } = require("../controllers/Auth.js");
// const {updateProfile}  = require("../controllers/UpdateProfile.js"); // Import the updateProfile function

// const {updatePatientProfile} = require("../controllers/UpdatePatController");
 
// // Authentication routes
// router.post('/login', login);
// router.get('/me', verifyUser,  me);
// router.post('/logout', logout);

// // User-related routes
// router.post('/users', createUser);
// router.get('/users', getUsers);
// router.get('/users/:id', getUserById);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

// // Profile-related route
// router.put('/update-profile', updateProfile);

// router.put('/update-pat-profile', updatePatientProfile);

// module.exports = router;




// const express = require("express");
// const {
//     getUsers,
//     createUser,
//     getUserById,
//     updateUser,
//     deleteUser
// } = require("../controllers/User.js") ;
// // const { verifyUser } = require("../middleware/AuthUser.js");

// const router = express.Router();

// router.get('/users',  getUsers);
// router.get('/users/:id', getUserById);
// router.post('/users', createUser);
// router.patch('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);



// // router.get('/users', verifyUser, adminOnly, getUsers);
// // router.get('/users/:id', verifyUser, adminOnly, getUserById);
// // router.post('/users', createUser);
// // router.patch('/users/:id', verifyUser,  updateUser);
// // router.delete('/users/:id', verifyUser, adminOnly, deleteUser);



// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const {createUser, getUsers, getUserById, updateUser, deleteUser} = require('../controllers/User.js');
// const {updateDoctorProfile} = require('../controllers/DoctorController.js');
// const {updatePatientProfile} = require('../controllers/PatientController.js');
// const {updaterole, updateAdminProfile } = require("../controllers/AdminController.js")

// const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");
// const {login, me, logout} = require("../controllers/Auth.js")
 
// // Authentication routes
// router.post('/login', login);
// router.get('/me', verifyUser, me);
// router.post('/logout', logout);

// // User-related routes
// router.post('/users', createUser);
// router.get('/users', getUsers);
// router.get('/users/:id', getUserById);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

// // Doctor-related routes
// router.put('/update-doctor-profile', verifyUser, updateDoctorProfile);

// // Patient-related routes
// router.put('/update-patient-profile', verifyUser, updatePatientProfile);

// // Update user role route
// router.put('/update-role', verifyUser, updaterole);

// // Update admin profile route
// router.put('/update-admin-profile', verifyUser, adminOnly, updateAdminProfile);


// module.exports = router;