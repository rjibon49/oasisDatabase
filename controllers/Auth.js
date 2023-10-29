const User = require("../models/UserModel.js");
const bcrypt = require("bcrypt");


const Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) return res.status(404).json({ msg: "User Not Found" });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const phoneNumber = user.phoneNumber;
    const role = user.role;
    res.status(200).json({ uuid, name, email, phoneNumber, role });
}


const Me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({msg:"Please login"})
    }
    const user = await User.findOne({
        attributes:['uuid', 'name', 'email', 'phoneNumber', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json ({msg: "User not found"});
    res.status(200).json(user);
}


const LogOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "Unable to log out"});
        res.status(200).json({msg: "You have logged out"});
    });
}


module.exports = {Login, Me, LogOut};