const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const db = require('./config/Database.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const AllRoutes = require('./routes/AllRoutes.js');


dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

const sessionStore = new SequelizeStore({
  db: db,
  expiration: 86400000, // session expiration time in milliseconds (1 day)
});

app.use(express.json());

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      secure: false,
      maxAge: 3600000,
    },
  })
);

  app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
  }));



app.use(AllRoutes); // Use the authentication routes

app.get('/api', (req, res) => {
  res.json({ time: Date().toString() });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// (async()=>{
//    await db.sync({ alter: true }), { force: true };
//  })();


// const passportConfig  = require('./config/passport-config'); // Import Passport configuration
// Use Passport configuration
// passportConfig();  // Make sure this line is correctly added

// const express = require('express');
// const cors = require('cors');
// const session = require('express-session');
// const dotenv = require('dotenv');
// const db = require('./config/Database.js');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const AllRoutes = require('./routes/AllRoutes.js');

// const passport = require('passport');
// const passportConfig = require('./config/passport-config');

// dotenv.config();

// const port = process.env.PORT || 5000;
// const app = express();

// const sessionStore = new SequelizeStore({
//     db: db,
//     expiration: 86400000, // session expiration time in milliseconds (1 day)
// });


// // (async()=>{
// //    await db.sync({ alter: true }), { force: true };
// // })();

// app.use(express.json());

// app.use(
//     session({
//       secret: process.env.SESS_SECRET,
//       resave: false,
//       saveUninitialized: true,
//       store: sessionStore,
//       cookie: {
//         secure: false, maxAge: 3600000 
//       },
//     })
//   );

//   app.use(cors({
//     credentials: true,
//     origin: 'http://localhost:3000'
//   }));
  
//   app.use(AllRoutes);
  
//   app.get('/api', (req, res) => {
//       res.json({ time: Date().toString() });
//   });
  
//   app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//   });


  // (async () => {
//     try {
//         await db.authenticate();
//         console.log('Database connection established successfully');
//         await db.sync({ alter: true });
//         console.log('Database synchronized successfully');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// })();


// app.use(
//     session({
//         secret: process.env.SESS_SECRET,
//         resave: false,
//         saveUninitialized: true,
//         store: sessionStore,
//         cookie: {
//             secure: process.env.NODE_ENV === 'development' ? false : true,
//         },
//     })
// );

// Configure CORS for specific origins
// const corsOptions = {
//     origin: 'http://yourfrontenddomain.com', // Replace with your frontend domain
//     credentials: true,
// };
// app.use(cors(corsOptions));

// Enable CORS for all routes
// app.use(cors());



// const express = require('express');
// const cors = require('cors');
// const session = require("express-session");
// const dotenv = require("dotenv");
// const db = require("./config/Database.js");
// const SequelizeStore = require("connect-session-sequelize")(session.Store);
// const AllRoutes = require("./routes/AllRoutes.js");


// dotenv.config();

// const port = process.env.PORT || 5000;
// const app = express();

// const sessionStore = new SequelizeStore({
//     db: db,
// });

// // (async()=>{
// //     await db.sync({ alter: true }), { force: true };
// // })();


// app.use(express.json());

// app.use(
//     session({
//         secret: process.env.SESS_SECRET,
//         resave: false,
//         saveUninitialized: true,
//         store: sessionStore,
//         cookie: {
//             secure: process.env.NODE_ENV === 'development' ? false : true, // Set to false in development
//         },
//     })
// );

// // Enable CORS for all routes
// app.use(cors());


// app.use(AllRoutes);

// app.get('/api', (req, res) => {
//     res.json({time: date().toString() });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });