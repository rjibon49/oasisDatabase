const express = require("express");
const {Login, Me, LogOut} = require("../controllers/Auth.js") ;

const router = express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', LogOut);

module.exports = router;