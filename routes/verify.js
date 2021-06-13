const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
app.use(cors({ credentials: true }));
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
const router = express.Router();

var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
let User = require("../models/userModel.js");
let randNumber = require("../models/randomNumber.js");
let TemporaryUserToken = require("../models/temporaryUserToken.js");
console.log("register beyatch!");
var crypto = require("crypto");
// require("dotenv").config()
// const express=require("express")
// const bodyParser=require("body-parser")
// const ejs=require("ejs")
// const app=express()
var xoauth2 = require("xoauth2");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { google } = require("googleapis");
// var crypto = require("crypto");
// const session=require("express-session")

// let User = require("../models/userModel.js");
// const passport=require("passport")
// const passportLocalMongoose=require("passport-local-mongoose")
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const findOrCreate = require('mongoose-findorcreate')
// const md5 =require("md5")
// // const encrypt=require("mongoose-encryption")
// app.set("view engine", "ejs")
// app.use(express.static("public"))
// app.use(bodyParser.urlencoded({extended: true}))
// // app.use(session({
// //   secret: 'Our little secret',
// //   resave: false,
// //   saveUninitialized: false,
// // }))
// // app.use(passport.initialize())
// // app.use(passport.session())

// mongoose.connect("mongodb://localhost:27017/ListingAppTodo",{useNewUrlParser:true})
// console.log(process.env.API_KEY )

// const userSchema=new mongoose.Schema({
//     userName: String,
//     email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     minlength: 3
//   },
//     password: String
// },{
//   timestamps: true,
// })

// //userSchema.plugin(encrypt, { secret: secret });
// // userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

// //userSchema.plugin(encrypt, {secret: secret,encryptedFields:[password]})
// // userSchema.plugin(passportLocalMongoose)
// userSchema.plugin(findOrCreate)

// const User=mongoose.model("User",userSchema)

router.route("/").post(async (req, res) => {
  
  
  var emHash = req.query.id
  var tempRand=req.query.rFieldVal
  console.log(emHash,tempRand)
  await TemporaryUserToken.findOne({ emHash: emHash }, async function (err, tempUserToken){
    if(tempUserToken.tempRand===tempRand && tempRand!== 'undefined'){
      const newUser = new User({
        userName: tempUserToken.uName,
        email: tempUserToken.tempEmail,
        password: tempUserToken.password,
      });
      await newUser.save(async function (err) {
        if (!err) {
          var u_iid = "";
          u_iid += newUser._id.toString();
          u_iid = crypto.createHash("md5").update(u_iid).digest("hex");
          var rFieldVal =
            u_iid + Math.random().toString(36).substring(7) + u_iid;
          // crypto.randomBytes(64).toString("hex");
          rFieldVal = crypto.createHash("md5").update(rFieldVal).digest("hex");
          const token = jwt.sign(
            {
              status: "Success",
              u_id: newUser._id,
              [u_iid]: rFieldVal,
            },
            process.env.TOKEN_SECRET
          );

          console.log("userRegister   " + token);

          res.cookie("token", token, { httpOnly: true });
          res.send({ status: "Successful", token: token });
          await randNumber.updateOne(
            { u_idHash: u_iid },
            { jToken: token },
            { upsert: true },
            function (err, docs) {
              if (err) {
                console.log(err);
                res.send({ status: "Update Failed" });
              } else {
                console.log("Original Doc : ", docs);
                // return
              }
            }
          );
        } else {
          return res.send({ status: "Wrong email or password!" });
        }
      });
    }
  })
  
  

  
  
});

module.exports = router;

