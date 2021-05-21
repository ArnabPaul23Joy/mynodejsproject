const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
// const publicPath = path.join(__dirname, '..', 'public');
require('dotenv').config();

// const cors = require("cors");
const cookieParser = require("cookie-parser");
// const path = require("path");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT||5000;

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.use(express.json());
// app.use(cookieParser());
// const router = express.Router();


let User = require("./models/userModel.js");
let randNumber = require("./models/randomNumber.js");
const passport = require("passport");
// const passportLocalMongoose=require("passport-local-mongoose")
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const md5 = require("md5");

app.use(passport.initialize());
app.use(passport.session());
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const path = require("path");
// app.use(cors({credentials: true }));
// app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'build')));
// app.use(express.static(path.join(__dirname, 'client/build')));
const uri = "mongodb://localhost:27017/ListingAppTodo";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// const exercisesRouter = require('./api/exercises');
const userLogin = require('./routes/userLogin');
const userLoginWithGoogle = require('./routes/userLoginGoogle');
const userRegister = require('./routes/userRegister');
const getPosts = require('./routes/getPosts');
const postNote = require('./routes/postNote');
const deleteNote = require('./routes/deleteNote');
const logOut = require('./routes/logOut');
const userLoginWithToken = require('./routes/userLoginWithToken');
// app.use('/exercises', exercisesRouter);

app.use('/login', userLogin);
// app.use('/googlesignin', userLoginWithGoogle);
app.use('/register', userRegister);
app.use('/getnotes/', getPosts);
app.use('/post', postNote);
app.use('/deletenote', deleteNote);
app.use('/logout', logOut);
app.use('/loginWithToken',userLoginWithToken)

// app.get('/*', function (req, res) {
//    res.sendFile(path.join(__dirname, 'build', 'index.html'));
//  });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname +'/../client/public/index.html'))
// });

// if (process.env.NODE_ENV === 'production') {
    console.log("production mode!")
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
//   const path = require('path');
//   app.get('/', (req, res) => {
//     console.log("pro mode!")
//     res.sendFile('client/build/index.html');
//   });
// }

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      print(profile);
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //findOrCreate isn't a mongo db function
        return cb(err, user);
      });
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log("user ", user);
    console.log("user ", req.user);
    res.send({ status: "testing" });
  }
);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// "test": "echo \"Error: no test specified\" && exit 1",
    