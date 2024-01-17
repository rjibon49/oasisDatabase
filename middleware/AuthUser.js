const { User } = require("../models/AllModel");

// const verifyUser = async (req, res, next) => {
//     try {
//         if (!req.session || !req.session.userId) {
//             return res.status(401).json({ msg: "Authentication required. Please log in to your account!" });
//         }

//         const user = await User.findOne({
//             where: {
//                 userId: req.session.userId
//             }
//         });

//         if (!user) {
//             return res.status(404).json({ msg: "User not found" });
//         }

//         req.userId = user.userId;
//         req.userrole = user.role;

//         next();
//     } catch (error) {
//         console.error('Error in verifyUser middleware:', error);
//         return res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// };

// const isPatient = (req, res, next) => {
//     try {
//         const userrole = req.userrole;

//         if (userrole !== 'Patient') {
//             return res.status(403).json({ msg: 'Access forbidden. Requires Patient role.' });
//         }

//         next();
//     } catch (error) {
//         console.error('Error in isPatient middleware:', error);
//         return res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// };
  

// // Middleware for Doctor role
// const isDoctor = (req, res, next) => {
//     try {
//         if (req.userrole !== 'Doctor') {
//             return res.status(403).json({ msg: 'Access forbidden. Requires Doctor role.' });
//         }

//         next();
//     } catch (error) {
//         console.error('Error in isDoctor middleware:', error);
//         return res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// };

// // Middleware for Admin role
// const isAdmin = (req, res, next) => {
//     try {
//         if (req.userrole !== 'Admin') {
//             return res.status(403).json({ msg: 'Access forbidden. Requires Admin role.' });
//         }

//         next();
//     } catch (error) {
//         console.error('Error in isAdmin middleware:', error);
//         return res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// };


// module.exports = { verifyUser, isPatient, isDoctor, isAdmin };


// Middleware for Patient role
// const isPatient = (req, res, next) => {
//     try {
//         if (req.userrole !== 'Patient') {
//             return res.status(403).json({ msg: 'Access forbidden. Requires Patient role.' });
//         }

//         next();
//     } catch (error) {
//         console.error('Error in isPatient middleware:', error);
//         return res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// };



// const adminOnly = async (req, res, next) => {
//     try {
//         const user = await User.findOne({
//             where: {
//                 userId: req.session.userId,
//             },
//         });

//         if (!user) {
//             return res.status(404).json({ msg: 'User not found' });
//         }

//         if (user.role !== 'Admin') { // Use 'role' with a capital 'R'
//             return res.status(403).json({ msg: 'Access Denied' });
//         }

//         // If the user is an admin, proceed to the next middleware or route handler
//         next();
//     } catch (error) {
//         console.error('Error in adminOnly middleware:', error);
//         return res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// };


// const User = require("../models/UserModel.js");

const verifyUser = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ msg: "Please log in to your account!" });
        }

        const user = await User.findOne({
            where: {
                userId: req.session.userId
            }
        });

        if (!user) {
            req.session.destroy(); // Clear the session if the user is not found
            return res.status(404).json({ msg: "User not found" });
        }

        req.userId = user.id;
        req.role = user.role;
        next();
    } catch (error) {
        console.error('Error verifying user:', error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

const adminOnly = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                userId: req.session.userId,
            },
        });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (user.role !== 'Admin') { // Use 'role' with a capital 'R'
            return res.status(403).json({ msg: 'Access Denied' });
        }

        // If the user is an admin, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error in adminOnly middleware:', error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = { verifyUser, adminOnly };