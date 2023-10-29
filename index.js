const express = require('express');
const cors = require('cors');
const session = require("express-session");
const dotenv = require("dotenv");
const db = require("./config/Database.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const UserRoute = require("./routes/UserRoute.js");
const AuthRoute = require("./routes/AuthRoute.js");


dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

const sessionStore = new SequelizeStore({
    db: db,
});

// (async()=>{
//     await db.sync({ alter: true }), { force: true };
// })();

app.use(
    session({
        secret: process.env.SESS_SECRET,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
        secure: "auto",
        },
    })
);


// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);

app.get('/api', (req, res) => {
    res.json({time: Date().toString() });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});