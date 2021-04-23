const router = require('express').Router();
const jwt=require("jsonwebtoken")
const  verify=require("./verifyToken")

// require("dotenv").config()
// const express=require("express")
// const bodyParser=require("body-parser")
// const ejs=require("ejs")
// const app=express()
const mongoose =require("mongoose")
const bcrypt=require("bcrypt")
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
const md5 =require("md5")
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
router.post('/',verify,(req, res) => {
    // console.log("req.body.token  ")
    if (req.user.status==="Invalid Token"){
        res.send({status: "Invalid Token",token: req.body.token})
    }
    else{
        PostNote.find({u_id: req.user.u_id}, function(err, notes) {

        if (err) { 
            res.send({status: "Something is wrong bruh!",token: req.body.token})
        }
        else{
            
            var u_iid=""
            bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.user.email, salt, function(err, hash) {
                 u_iid=hash
                })
                    
            })
                
            //  var rField=Math.random().toString(36).substring(7)
                        var rFieldVal=u_iid+Math.random().toString(36).substring(7)+u_iid
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(rFieldVal, salt, function(err, hash) {
                                rFieldVal=hash
                                })
                                    
                            })
                        
                            const gtok=jwt.sign({
                                status: "Success",
                                email: req.user.email,
                                u_id: req.user.u_id,
                                [u_iid]: rFieldVal
                            }, process.env.TOKEN_SECRET)
                        randNumber.updateOne({u_idHash: u_iid}, {u_idHash: u_iid,jToken: token}, {upsert: true}, function (err) {
                                res.send("Update Failed")
                            });
                            

            if(notes.length==0){
                res.send({status: "no data found",token:gtok})
            }
            else{
                res.send({status: "Found bruh!", notes:notes,token:gtok})
            }
        };
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
})

module.exports = router;