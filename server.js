const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
// const publicPath = path.join(__dirname, '..', 'public');
require('dotenv').config();
// const cors = require("cors");

// const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
var crypto = require("crypto");
const cookieParser = require("cookie-parser");
// const path = require("path");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT||5000;

// app.use(cors());
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: false}));

// app.use(express.json());
// app.use(cookieParser());
// const router = express.Router();
console.log

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
const LoginWithGoogle = require("./routes/LoginGoogle.jsx");
const userRegister = require('./routes/userRegister');
const getPosts = require('./routes/getPosts');
const postNote = require('./routes/postNote');
const deleteNote = require('./routes/deleteNote');
const logOut = require('./routes/logOut');
const userLoginWithToken = require('./routes/userLoginWithToken');
// app.use('/exercises', exercisesRouter);

app.use('/login', userLogin);
app.use('/googlesignin/', LoginWithGoogle);
app.use('/register', userRegister);
app.use('/getnotes/', getPosts);
app.use('/post', postNote);
app.use('/deletenote', deleteNote);
app.use('/logout', logOut);
app.use('/loginWithToken',userLoginWithToken)

app.use(passport.initialize());
app.use(passport.session());
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
// var newUser= new User()
// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
var newUser;
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "http://localhost:5000/callback",
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       console.log(profile.emails[0].value);
//       var stttt = "";
//       stttt += profile.emails[0].value + profile.id;
//       var hash = crypto.createHash("md5").update(stttt).digest("hex");
//       newUser = new User({
//         userName: profile.displayName,
//         email: profile.emails[0].value,
//         password: hash,
//         googleId: profile.id,
//       });
//       // bcrypt.genSalt(10, async function (err, salt) {
//       //   bcrypt.hash(stttt, salt, async function (err, hash) {

//       //   })
//       // })
//       User.findOrCreate({ googleId: newUser.googleId }, function (err, user) {
//         //findOrCreate isn't a mongo db function
//         // newUser.

//         // if (err){
//         //   return cb(err, user);
//         // }
//         // else{
//         // if (!user){

//         // }
//         console.log(newUser);
//         console.log("user  ", user);
//         return cb(err, newUser);
//         // }
//       });
//     }
//   )
// );

// app.get(
//   "/",
//   passport.authenticate("google", { scope: ["profile","email"] })
// );

// app.get(
//   "/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     // console.log("user ", user);
//     // console.log("user ", req.user);
//     res.send({ status: "testing", newUser: newUser });
//   }
// );



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// "test": "echo \"Error: no test specified\" && exit 1",
    