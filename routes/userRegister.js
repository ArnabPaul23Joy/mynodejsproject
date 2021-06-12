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
  // const uName=req.body.email
  // const pword=req.body.password

  // req.login(user,function(err){
  //     if(err){
  //         () => res.status(400).json('Error: ' + err);
  //     }
  //     else{

  //     }
  // })
  await bcrypt.genSalt(3, async function (err, salt) {
    await bcrypt.hash(req.body.password, salt, async function (err, hash) {
      // const newUser = new User({
      //   userName: req.body.uName,
      //   email: req.body.email,
      //   password: hash,
      // });
      var u_iid = crypto
        .createHash("md5")
        .update(req.body.email)
        .digest("hex");
      var tempRand = crypto.randomBytes(64).toString("hex");
      host = req.get("host")
      var tempEmail = req.body.email.toString();
      console.log("req.body.email    " + req.body.email.toString());
      const tempUser = {
        tempEmail,
        hash,
        tempRand,
      };
      console.log(tempUser.tempEmail, tempUser.tempRand);
      await TemporaryUserToken.findOneAndUpdate({ tempEmail: tempEmail }, tempUser, {new: true,upsert: true}, async function(err) {
        if(!err){
          const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
              user: "dane.hermann@ethereal.email",
              pass: "VMfHnUmXsT21f58KCs",
            },
          });
          link = "http://" + req.get("host") + "/verify?id=" + u_iid + "&rFieldVal="+tempRand;
          var mailOptions = {
            from: '"Nodemailer Contact" <dane.hermann@ethereal.email>',
            to: tempEmail,
            subject: "Please confirm your Email account",
            html:
              "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
              link +
              ">Click here to verify</a>",
          };
          // console.log(mailOptions);
          await transporter.sendMail(mailOptions, async function (error, response) {
            if (error) {
              console.log(error);
              return res.send("Wrong email or password!");
            } else {
              console.log(response);
              return res.send("Check your email please");
            }
          });
          
        }
        else{
          return res.send("Sorry, Something is wrong!");
        }
      });
      
      // .find(, async function (err, foundUser){
        
      // })
      



      
      // .then(()=> res.json('User added Successfully'))
      // .catch(err => res.status(400).json('Error: ' + err));

      // Store hash in your password DB.
    });
  });
  // user.save()
  // User.findOne({email: uName},function(err,foundUser){
  //     if(!err){

  //         if(foundUser){
  //             bcrypt.compare(pword,foundUser.password,function(err,result){
  //                 if (result==true){
  //                     console.log("")
  //                     .then(()=> res.json(user.uName))
  //                     .catch(err => res.status(400).json('Error: ' + err));
  //                 }
  //             })
  //         }
  //         if(foundUser.password==pword){
  //             res.render("secrets")
  //         }
  //         else{
  //             res.send("wrong pasword")
  //         }
  //     }
  //     else{
  //         console.log(err)
  //     }
  // })
});

module.exports = router;
