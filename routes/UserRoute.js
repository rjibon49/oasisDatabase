const express = require("express");
const {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/User.js") ;
// const { verifyUser } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get('/users',  getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);



// router.get('/users', verifyUser, adminOnly, getUsers);
// router.get('/users/:id', verifyUser, adminOnly, getUserById);
// router.post('/users', createUser);
// router.patch('/users/:id', verifyUser,  updateUser);
// router.delete('/users/:id', verifyUser, adminOnly, deleteUser);



module.exports = router;