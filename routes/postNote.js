const router = require("express").Router();
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

let User = require("../models/userModel.js");

let randNumber = require("../models/randomNumber.js");

// var crypto = require("crypto");
let PostNote = require("../models/postModel.js");
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

router.post("/", verify,async(req, res) => {
  console.log("req.body.title  " + req.body.title);
  console.log("req.body.content  " + req.body.content);
  // console.log(req.user)
  if (req.user.status === "Invalid Token") {
    return res.send(req.user.status);
  } else {
    const newNote = new PostNote({
      u_id: req.user.u_id,
      email: req.user.email,
      postTitle: req.body.title,
      postContent: req.body.content,
    });
    await newNote.save(async function (err) {
      if (!err) {
        // var u_iid=""
        // bcrypt.genSalt(10, function(err, salt) {
        // bcrypt.hash(req.user.email, salt, function(err, hash) {
        //      u_iid=hash
        //     })

        // })

        // //  var rField=Math.random().toString(36).substring(7)
        //             var rFieldVal=u_iid+Math.random().toString(36).substring(7)+u_iid
        //             bcrypt.genSalt(10, function(err, salt) {
        //                 bcrypt.hash(rFieldVal, salt, function(err, hash) {
        //                     rFieldVal=hash
        //                     })

        //                 })
        var eemail = "";
        eemail += req.user.email;
        var u_iid = crypto.createHash("md5").update(eemail).digest("hex");
        var rFieldVal = u_iid + Math.random().toString(36).substring(7) + u_iid;
        rFieldVal = crypto.createHash("md5").update(rFieldVal).digest("hex");

        const gtok = jwt.sign(
          {
            status: "Success",
            email: eemail,
            u_id: req.user.u_id,
            [u_iid]: rFieldVal,
          },
          process.env.TOKEN_SECRET
        );
        res.send({
            status: "Successfully added",
            token: gtok,
            noteNew: newNote
        });


        await randNumber.findOneAndUpdate(
            { u_idHash: u_iid },
            { jToken: gtok },
            null,
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
        return ""
        // randNumber.updateOne(
        //   { upsert: true },
        //   function (err) {
        //     if (err) {
        //       return res.send({ status: "Update Failed" });
        //     }
        //     else{        
        //         return res.send({
        //         status: "Successfully added",
        //         token: gtok,
        //         noteNew: newNote
        //         });
        //     }
        //   }
        // );
      } else {
        return res.send({
          status: "Failed to save the note bruh!",
        });
      }
    });
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
