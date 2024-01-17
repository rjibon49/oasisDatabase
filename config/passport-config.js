// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');

// const { User } = require('../models/AllModel');

// const passportConfig = () => {
// passport.use(
//   new LocalStrategy({ usernameField: 'identifier' }, async (identifier, password, done) => {
//     try {
//       // Check if the identifier is an email
//       const isEmail = /\S+@\S+\.\S+/.test(identifier);
//       let user;

//       if (isEmail) {
//         // If the identifier is an email, find the user by email
//         user = await User.findOne({ where: { email: identifier } });
//       } else {
//         // If the identifier is not an email, find the user by username
//         user = await User.findOne({ where: { username: identifier } });
//       }

//       if (!user) {
//         return done(null, false, { message: 'Incorrect email, username, or password' });
//       }

//       const match = await bcrypt.compare(password, user.password);

//       if (match) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: 'Incorrect email, username, or password' });
//       }
//     } catch (error) {
//       return done(error);
//     }
//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findByPk(id);
//     done(null, user);
//   } catch (error) {
//     done(error);
//   }
// });
// }

// module.exports = passportConfig;
