const router = require("express").Router();

const jwt = require("jsonwebtoken");
let User = require("../models/userModel.js");
let randNumber = require("../models/randomNumber.js");
console.log("register beyatch!");
var crypto = require("crypto");
// require("dotenv").config()
// const express=require("express")
// const bodyParser=require("body-parser")
// const ejs=require("ejs")
// const app=express()
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// var crypto = require("crypto");
// const session=require("express-session")

// let User = require("../models/userModel.js");
// // const passport=require("passport")
// // const passportLocalMongoose=require("passport-local-mongoose")
// // const GoogleStrategy = require('passport-google-oauth20').Strategy;
// // const FacebookStrategy = require('passport-facebook').Strategy;
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
  bcrypt.genSalt(3, async function (err, salt) {
    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      const newUser = new User({
        userName: req.body.uName,
        email: req.body.email,
        password: hash,
      });

      await newUser.save(async function (err) {
        if (!err) {
          //     var u_iid=""
          //     bcrypt.genSalt(10, function(err, salt) {
          //     bcrypt.hash(newUser.email, salt, function(err, hash) {
          //         u_iid=hash
          //         })

          //     })
          // // var rField=Math.random().toString(36).substring(7)
          // var rFieldVal=+u_iid+Math.random().toString(36).substring(7)+u_iid
          //  bcrypt.genSalt(10, function(err, salt) {
          //     bcrypt.hash(rFieldVal, salt, function(err, hash) {
          //         rFieldVal=hash
          //         })

          //     })

          var u_iid = crypto
            .createHash("md5")
            .update(newUser.email)
            .digest("hex");
          var rFieldVal =
            u_iid + Math.random().toString(36).substring(7) + u_iid;
          rFieldVal = crypto.createHash("md5").update(rFieldVal).digest("hex");
          const token = jwt.sign(
            {
              status: "Success",
              email: newUser.email,
              u_id: newUser._id,
              [u_iid]: rFieldVal,
            },
            process.env.TOKEN_SECRET
          );
          console.log("userRegister   " + token);
          res.send(token);
          await randNumber.updateOne(
            { u_idHash: u_iid },
            { jToken: token },
            {upsert: true},
            function (err, docs) {
              if (err) {
                console.log(err);
              } else {
                console.log("Original Doc : ", docs);
                res.send({ status: "Update Failed" });
                // return
              }
            }
          );
        //   await randNumber.updateOne(
        //     { upsert: true },
        //     function (err) {
        //       if (err) {
        //         res.send("Update Failed");
        //       }
        //     }
        //   );

          return "";
        } else {
          return res.send("user exists already you fuck!");
        }
      });
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
