const router = require("express").Router();
const jwt = require("jsonwebtoken");
const verifyTokengetReq = require("./verifyTokengetReq");

// require("dotenv").config()
// const express=require("express")
// const bodyParser=require("body-parser")
// const ejs=require("ejs")
// const app=express()
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bcrypt2 = require("bcrypt");
var crypto = require("crypto");
// const session=require("express-session")

// var crypto = require("crypto");

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

// verify

let allNotes = [];
router.get("/", verifyTokengetReq, (req, res) => {
  console.log("req.user.status   " + req.user.status);
  if (req.user.status === "Invalid Token") {
    return res.send({ status: "Invalid Token", token: req.body.token });
  } else {
    allNotes=PostNote.find({ u_id: req.user.u_id })
    //    else {
    //     Array.prototype.push.apply(allNotes, posts);
    //     console.log(allNotes);

    //     // var u_iid=""
    //     // bcrypt2.genSalt(10, function(err, salt) {
    //     // bcrypt2.hash(req.user.email, salt, function(err, hash) {
    //     //      u_iid=hash
    //     //     })

    //     // })

    //     // //  var rField=Math.random().toString(36).substring(7)
    //     //             var rFieldVal=u_iid+Math.random().toString(36).substring(7)+u_iid
    //     //             bcrypt2.genSalt(10, function(err, salt) {
    //     //                 bcrypt2.hash(rFieldVal, salt, function(err, hash) {
    //     //                     rFieldVal=hash
    //     //                     })

    //     //                 })
    //   }
    var email = "";
    email += req.user.email;

    var u_iid = crypto.createHash("md5").update(email).digest("hex");
    var rFieldVal = u_iid + Math.random().toString(36).substring(7) + u_iid;
    rFieldVal = crypto.createHash("md5").update(rFieldVal).digest("hex");
    console.log("get posts u_iid   " + u_iid);
    // var u_iid = crypto.createHash('md5').update().digest('hex');
    // var rFieldVal=u_iid+Math.random().toString(36).substring(7)+u_iid
    // rFieldVal = crypto.createHash('md5').update(rFieldVal).digest('hex');
    // allNotes=notes
    var gtok = jwt.sign(
      {
        status: "Success",
        email: req.user.email,
        u_id: req.user.u_id,
        [u_iid]: rFieldVal,
      },
      process.env.TOKEN_SECRET
    );
    // console.log(gtok)
    // var tkn=""
    // tkn+=gtok
    // return res.json({ status: "just checking", token: gtok });
    var errorExists=""
    randNumber.updateOne(
      { u_idHash: u_iid },
      { jToken: gtok },
      { upsert: true }
    );
    // ,
    //   function (errors) {
    //     console.log(errors)
    //     if (!errors) {
    //         errorExists="Valid Token"
    //       // if(allNotes.length==0){
          

    //       // }
    //       // else{
    //       //     res.send({status: "no data found",notes: allNotes, token:gtok})
    //       // }
    //     } else {
    //       errorExists="Invalid Token"
    //     //   return res.send({ status: "Something is wrong bruh!", token: gtok });
    //     }
    //   }
    console.log(allNotes);
    return res.send({
      status: "Found bruh!",
      notes: allNotes,
      token: gtok
    });
    // if (errorExists == "Valid Token"){
        
    // }
      
    // else{
    //     return res.send({ status: "Something is wrong bruh!", token: gtok });
    // }
    // catch (error) {
    //     console.log("gdgdgdgg");
    //     console.log(gtok);
    //     console.log(error);
    //     return res.send({ status: "Invalid Token" });
    //   }
  }
  // const uName=req.body.email
  // const pword=req.body.password
  // const user=new User({
  //         email: req.body.email,
  //         password: req.body.password
  //     })
  //     req.login(user,function(err){
  //         if(err){
  //             res.send({
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
  //                     // res.send({
  //                     //     status: "Success",
  //                     //     email: foundUser.email,
  //                     //     u_id: foundUser._id
  //                     // })
  //                 }
  //                 else{
  //                     res.send({
  //                         status: "Wrong password bruh!"
  //                     })
  //                 }
  //             })
  //         }

  //         else{
  //             res.send({
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
  //         res.send({
  //             status: "Wrong information bruh!"
  //         })
  //     }
  // })
});

module.exports = router;
