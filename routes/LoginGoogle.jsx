const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const app = express();
app.use(express.json());
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
const router = express.Router();

// require("dotenv").config()
// const express=require("express")
// const bodyParser=require("body-parser")
// const ejs=require("ejs")
// const app=express()
const mongoose = require("mongoose");
var crypto = require("crypto");
let bcrypt = require("bcrypt");
let bcrypt2 = require("bcrypt");
// const session=require("express-session")
// var crypto = require("crypto");

let User = require("../models/userModel.js");
let randNumber = require("../models/randomNumber.js");
// const passport=require("passport")
// const passportLocalMongoose=require("passport-local-mongoose")
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const findOrCreate = require('mongoose-findorcreate')
const md5 = require("md5");

// app.use(passport.initialize());
// app.use(passport.session());

// mongoose.connect("mongodb://localhost:27017/secretDB", {
//   useNewUrlParser: true,
// });

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });
// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   googleId: String,
//   facebookID: String,
//   secret: String,
// });
router.get("/",function(req,res){
  const client = new OAuth2Client(CLIENT_ID);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: req.params.token,
      audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    console.log(payload)
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }
  verify().catch(console.error);
})
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "/auth/google/",
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       print(profile);
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         //findOrCreate isn't a mongo db function
//         return cb(err, user);
//       });
//     }
//   )
// );


// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );

// router.get(
//   "/auth/google/",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     console.log("user ",user)
//     console.log("user ", req.user);
//     res.send({status:"testing"});
//   }
// );
module.exports = router;

