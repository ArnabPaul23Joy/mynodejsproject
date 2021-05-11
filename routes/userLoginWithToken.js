const router = require("express").Router();
const jwt = require("jsonwebtoken");

// require("dotenv").config()
// const express=require("express")
// const bodyParser=require("body-parser")
// const ejs=require("ejs")
// const app=express()
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var crypto = require("crypto");
// const session=require("express-session")
// var crypto = require("crypto");

// const jwt=require("jsonwebtoken")
const verifyTokengetReq = require("./verifyTokengetReq");

let User = require("../models/userModel.js");
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

router.post("/", verifyTokengetReq, (req, res) => {
  if (req.user.status === "Invalid Token") {
    return res.send({ status: "Invalid Token" });
  } else {
    var u_iid = crypto.createHash("md5").update(req.user.email).digest("hex");
    var rFieldVal = u_iid + Math.random().toString(36).substring(7) + u_iid;
    rFieldVal = crypto.createHash("md5").update(rFieldVal).digest("hex");
    const gtok = jwt.sign(
      {
        status: "Success",
        email: req.user.email,
        u_id: req.user.u_id,
        [u_iid]: rFieldVal,
      },
      process.env.TOKEN_SECRET
    );
    return res.send({ staus: "Success", token: gtok });
  }
  // const uName=req.body.email
  // const pword=req.body.password
  // // const user=new User({
  // //         email: req.body.email,
  // //         password: req.body.password
  // //     })
  // //     req.login(user,function(err){
  // //         if(err){
  // //             res.json({
  // //                 status: "Wrong password bruh!"
  // //         })
  // //         }else{
  // //             passport.authenticate("local")(req,res,function(){
  // //                 res.render("secrets")
  // //             })
  // //         }
  // //     })
  // // console.log(uName+" "+pword)
  //     User.findOne({email: uName},function(err,foundUser){
  //         if(!err){
  //             console.log("found user "+uName)
  //             if(foundUser){
  //                 bcrypt.compare(pword,foundUser.password,function(err,result){

  //                     // var rField=crypto.randomBytes(20).toString('hex')
  //                     if (result==true){
  //                     var rField=Math.random().toString(36).substring(7)
  //                     var rFieldVal=Math.random().toString(36).substring(7)
  //                         const token=jwt.sign({
  //                             status: "Success",
  //                             email: foundUser.email,
  //                             u_id: foundUser._id,
  //                             [rField]: rFieldVal
  //                         }, process.env.TOKEN_SECRET)
  //                         res.send(token)
  //                         // res.json({
  //                         //     status: "Success",
  //                         //     email: foundUser.email,
  //                         //     u_id: foundUser._id
  //                         // })
  //                         // res.json()
  //                     }
  //                     else{
  //                         res.send("Wrong password bruh!")
  //                     }
  //                 })
  //             }

  //             else{
  //                 res.send("Wrong email bruh!")
  //             }
  //             // if(foundUser.password==pword){
  //             //     res.render("secrets")
  //             // }
  //             // else{
  //             //     res.send("wrong pasword")
  //             // }
  //         }
  //         else{
  //                 res.send("Wrong email bruh!")
  //         }
  //     })
});

module.exports = router;
