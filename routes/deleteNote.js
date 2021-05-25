const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());
const router = express.Router();
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

// require("dotenv").config()
// const express=require("express")
// const bodyParser=require("body-parser")
// const ejs=require("ejs")
// const app=express()
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var crypto = require("crypto");
// const session=require("express-session")

var crypto = require("crypto");

let User = require("../models/userModel.js");

let PostNote = require("../models/postModel.js");

let randNumber = require("../models/randomNumber.js");
//const passport=require("passport")
// const passportLocalMongoose=require("passport-local-mongoose")
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const findOrCreate = require('mongoose-findorcreate')
const md5 = require("md5");
// const encrypt=require("mongoose-encryption")
// app.set("view engine", "ejs")
// app.use(express.static("public"))
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(session({
//   secret: 'Our little secret',
//   resave: false,
//   saveUninitialized: false,
// }))
// app.use(passport.initialize())
// app.use(passport.session())

router.post("/", verify, async (req, res) => {
  // console.log("req.body.token  ")
  // console.log(req.user)
  if (req.user.status === "Invalid Token") {
    return res.send(req.user.status);
  } else {
    await PostNote.deleteOne(
      { _id: req.body.note._id },
      async function (err, obj) {
        if (err) {
          return res.send({
            status: "Delete failed",
            token: req.body.token,
          });
        } else {
          //     var u_iid=""
          // bcrypt.genSalt(10, function(err, salt) {
          // bcrypt.hash(req.user.email, salt, function(err, hash) {
          //      u_iid=hash
          //     })

          // })
          var eml = "";
          // eml += req.user.email;
          var u_iid = crypto.createHash("md5").update(req.user.u_id).digest("hex");
          var rFieldVal =
            u_iid + Math.random().toString(36).substring(7) + u_iid;
          rFieldVal = crypto.createHash("md5").update(rFieldVal).digest("hex");

          //  var rField=Math.random().toString(36).substring(7)
          // var rFieldVal=u_iid+Math.random().toString(36).substring(7)+u_iid
          //  bcrypt.genSalt(10, function(err, salt) {
          //     bcrypt.hash(rFieldVal, salt, function(err, hash) {
          //         rFieldVal=hash
          //         })

          //     })

          const token = jwt.sign(
            {
              status: "Success",
              // email: eml,
              u_id: req.user.u_id,
              [u_iid]: rFieldVal,
            },
            process.env.TOKEN_SECRET
          );
                        
          console.log("token");
          console.log(token)


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
          ).then(()=>{
            
            res.cookie("token", token, { httpOnly: true });
            res.send({ status: "Delete Succeeded", token: token });
          })

          // return "";
          //     randNumber.updateOne(,
          //       { upsert: true },
          //       function (err) {
          //         return
          //       }
          //     );

          // return
        }
      }
    );
    // const newNote=new PostNote({
    //                 u_id: req.user.u_id,
    //                 email: req.user.email,
    //                 postTitle: req.body.title,
    //                 postContent : req.body.content
    //             })
    // newNote.save(function(err){
    //             if(!err){
    //                     // const response=jwt.sign({
    //                     //     status: "Success",
    //                     //     email: foundUser.email,
    //                     //     u_id: foundUser._id
    //                     // }, process.env.TOKEN_SECRET)
    //                     res.send(req.body.token)

    //             }
    //             else{
    //                 res.send({status: "Failed to save the note bruh!"})
    //             }
    //         })
  }
  // const uName=req.body.email
  // const pword=req.body.password
  // const user=new User({
  //         email: req.body.email,
  //         password: req.body.password
  //     })
  //     req.login(user,function(err){
  //         if(err){
  //             res.json({
  //                 status: "Wrong password bruh!"
  //         })
  //         }else{
  //             passport.authenticate("local")(req,res,function(){
  //                 res.render("secrets")
  //             })
  //         }
  //     })
  // console.log(uName+" "+pword)
  // User.findOne({email: uName},function(err,foundUser){
  //     if(!err){
  //         console.log("found user "+uName)
  //         if(foundUser){
  //             bcrypt.compare(pword,foundUser.password,function(err,result){
  //                 if (result==true){
  //                     const token=jwt.sign({
  //                         status: "Success",
  //                         email: foundUser.email,
  //                         u_id: foundUser._id
  //                     }, process.env.TOKEN_SECRET)
  //                     res.header("auth-token",token).send(token)
  //                     // res.json({
  //                     //     status: "Success",
  //                     //     email: foundUser.email,
  //                     //     u_id: foundUser._id
  //                     // })
  //                 }
  //                 else{
  //                     res.json({
  //                         status: "Wrong password bruh!"
  //                     })
  //                 }
  //             })
  //         }

  //         else{
  //             res.json({
  //                 status: "Wrong email bruh!"
  //             })
  //         }
  //         // if(foundUser.password==pword){
  //         //     res.render("secrets")
  //         // }
  //         // else{
  //         //     res.send("wrong pasword")
  //         // }
  //     }
  //     else{
  //         res.json({
  //             status: "Wrong information bruh!"
  //         })
  //     }
  // })
});

// router.route('/').post((req, res) => {
//     const uName=req.body.email
//     const pword=req.body.password
//     // const user=new User({
//     //         email: req.body.email,
//     //         password: req.body.password
//     //     })
//     //     req.login(user,function(err){
//     //         if(err){
//     //             res.json({
//     //                 status: "Wrong password bruh!"
//     //         })
//     //         }else{
//     //             passport.authenticate("local")(req,res,function(){
//     //                 res.render("secrets")
//     //             })
//     //         }
//     //     })
//     // console.log(uName+" "+pword)
//         User.findOne({email: uName},function(err,foundUser){
//             if(!err){
//                 console.log("found user "+uName)
//                 if(foundUser){
//                     bcrypt.compare(pword,foundUser.password,function(err,result){
//                         if (result==true){
//                             const token=jwt.sign({
//                                 status: "Success",
//                                 email: foundUser.email,
//                                 u_id: foundUser._id
//                             }, process.env.TOKEN_SECRET)
//                             res.header("auth-token",token).send(token)
//                             // res.json({
//                             //     status: "Success",
//                             //     email: foundUser.email,
//                             //     u_id: foundUser._id
//                             // })
//                         }
//                         else{
//                             res.json({
//                                 status: "Wrong password bruh!"
//                             })
//                         }
//                     })
//                 }

//                 else{
//                     res.json({
//                         status: "Wrong email bruh!"
//                     })
//                 }
//                 // if(foundUser.password==pword){
//                 //     res.render("secrets")
//                 // }
//                 // else{
//                 //     res.send("wrong pasword")
//                 // }
//             }
//             else{
//                 res.json({
//                     status: "Wrong information bruh!"
//                 })
//             }
//         })
// })

module.exports = router;
