const { Op } = require("sequelize");
const { User, DoctorProfile } = require("../models/AllModel");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [{ email: identifier }, { username: identifier }],
            },
        });

        if (!user) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        req.session.userId = user.userId || null;

        console.log('User ID set in session:', req.session.userId);

        return res.status(200).json({ userId: user.userId, email: user.email, role: user.role, username: user.username });
    } catch (error) {
        console.error("Error during login", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const Me = async (req, res) => {
    try {
        if (!req.session || !req.session.userId) {
            return res.status(401).json({ message: 'Please log in' });
        }

        const user = await User.findOne({
            attributes: ['userId', 'email', 'username', 'role'],
            include: [
                {
                    model: DoctorProfile,
                    attributes: ['name', 'phoneNumber', 'address', 'specialization', 'education', 'licenseNumber'],
                },
                // Add other associations as needed
            ],
            where: {
                userId: req.session.userId,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User Object:', user);

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user information:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// const Me = async (req, res) => {
//     try {
//         if (!req.session || !req.session.userId) {
//             return res.status(401).json({ message: 'Please log in' });
//         }

//         const user = await User.findOne({
//             attributes: ['userId', 'email', 'username', 'role'],
//             where: {
//                 userId: req.session.userId,
//             },
//         });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         console.log('User Object:', user);

//         return res.status(200).json(user);
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

const logout = (req, res) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                console.error('Error during logout:', error);
                return res.status(500).json({ message: 'Unable to log out' });
            }
            return res.status(200).json({ message: 'You have logged out' });
        });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { login, Me, logout };



// // const login = async (req, res) => {
// //     const { identifier, password } = req.body;

// //     try {

// //         // Check if the user exists by email or username
// //         const user = await User.findOne({
// //             where: {
// //                 [Op.or]: [{ email: identifier }, { username: identifier }],
// //             },
// //         });


// //         if (!user) {
// //             return res.status(404).json({ message: "User not found" });
// //         }

// //         // Check if the password is correct
// //         const match = await bcrypt.compare(password, user.password);

// //         if (!match) {
// //             return res.status(400).json({ message: "Incorrect password" });
// //         }

// //         // Set session variables
// //         req.session.userId = user.id;
// //         console.log('User ID set in session:', req.session.userId);

// //         const { id, email, role, username } = user;

// //         return res.status(200).json({ id, email, role, username });
// //     } catch (error) {
// //         console.error("Error during login", error);
// //         return res.status(500).json({ message: "Internal server error" });
// //     }

// // };



// const Me = async (req, res) => {
//     try {
//         if (!req.session || !req.session.userId) {
//             return res.status(401).json({ message: 'Please log in' });
//         }

//         const user = await User.findOne({
//             attributes: ['userId', 'email', 'username', 'role'],
//             where: {
//                 userId: req.session.userId,
//             },
//         });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         console.log('User Object:', user);

//         return res.status(200).json(user);
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

// const login = async (req, res) => {
//     const { identifier, password } = req.body;

//     try {
//         // Check if the user exists by email or username
//         const user = await User.findOne({
//             where: {
//                 [Op.or]: [{ email: identifier }, { username: identifier }],
//             },
//         });

//         if (!user) {
//             return res.status(404).json({ message: "Invalid credentials" });
//         }

//         // Check if the password is correct
//         const match = await bcrypt.compare(password, user.password);

//         if (!match) {
//             return res.status(400).json({ message: "Incorrect password" });
//         }

//         // Set session variables
//     req.session.userId = user.userId; // Ensure user.userId is defined

//     const { userId, email, role, username } = user;

//     console.log('User ID set in session:', req.session.userId);

//     return res.status(200).json({ userId, email, role, username });
//     } catch (error) {
//         console.error("Error during login", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// const me = async (req, res) => {
//     try {

//         // Check if the user is authenticated
//         if (!req.session || !req.session.userId) {
//             return res.status(401).json({ message: 'Please log in' });
//         }

//         // Fetch user profile
//         const user = await User.findOne({
//             attributes: ['userId', 'email', 'username', 'role'],
//             where: {
//                 userId: req.session.userId, // Use req.session.userId
//             },
//         });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         return res.status(200).json(user);
//     } catch (error) {
//         console.error('Error fetching user profile:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

// const logout = (req, res) => {
//     try {
//         // Destroy session
//         req.session.destroy((error) => {
//             if (error) {
//                 console.error('Error during logout:', error);
//                 return res.status(500).json({ message: 'Unable to log out' });
//             }
//             return res.status(200).json({ message: 'You have logged out' });
//         });
//     } catch (error) {
//         console.error('Error during logout:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

// module.exports = { login, me, logout };