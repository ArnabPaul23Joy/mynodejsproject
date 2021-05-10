const router = require('express').Router();
const jwt=require("jsonwebtoken")

// require("dotenv").config()
// const express=require("express")
// const bodyParser=require("body-parser")
// const ejs=require("ejs")
// const app=express()
const mongoose =require("mongoose")
var crypto = require('crypto');
let bcrypt=require("bcrypt")
let bcrypt2=require("bcrypt")
// const session=require("express-session")
// var crypto = require("crypto");


let User = require("../models/userModel.js");
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







router.route('/').post(  (req, res) => {
    const uName=req.body.email
    const pword=req.body.password
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
         User.findOne({email: uName},  function(err,foundUser){
            if(!err){
                console.log("found user "+uName)
                if(foundUser){
                    bcrypt.compare(pword,foundUser.password, function(err,result){
                        
                        // var rField=crypto.randomBytes(20).toString('hex')
                        if (result==true){
                        
                
                            // console.log(foundUser._id.toString())
                            // bcrypt2.genSalt(10, function(err, salt) {

                            // bcrypt2.hash(foundUser.email, salt, function(err, hash) {
                            //     if(!err){
                            //          u_iid+=hash
                            //         console.log("u_iid   "+u_iid)
                                    
                            //     }
                            //     else{
                            //         console.log("errrrrrrrrrrrrrrrrrrrr")
                            //     }
                            //     })
                                    
                            // })
                        // var rField=Math.random().toString(36).substring(7)
                        var u_iid = crypto.createHash('md5').update(foundUser.email).digest('hex');
                        var rFieldVal=u_iid+Math.random().toString(36).substring(7)+u_iid
                        rFieldVal = crypto.createHash('md5').update(rFieldVal).digest('hex');
                        // bcrypt2.genSalt(10, function(err, salt) {
                        //     bcrypt2.hash(rFieldVal, salt, function(err, hash) {
                        //         if(!err){
                        //              rFieldVal=hash
                                    
                        //         }
                        //         else{
                        //             console.log(err)
                        //         }
                                
                        //         })
                                    
                        //     })
                            const token=jwt.sign({
                                status: "Success",
                                email: foundUser.email,
                                u_id: foundUser._id,
                                [u_iid]: rFieldVal
                            }, process.env.TOKEN_SECRET)
                            console.log("u_iid   "+u_iid)
                        console.log("rFieldVal    "+rFieldVal)
                             randNumber.updateOne({u_idHash: u_iid}, {jToken: token}, {upsert: true}, function (err) {
                                console.log("errrrrrrrrrrrrrr")
                                if(!err){
                                    var gttt=""
                                    gttt+=token
                                    console.log("token from the login  "+gttt)
                                    // res.header("auth-token", token).send(token)
                                    res.send({status:"Successful", token:gttt})

                                }
                                else{
                                    res.send({status:"eroor"})

                                }
                            });
                            
                            // res.json({
                            //     status: "Success",
                            //     email: foundUser.email,
                            //     u_id: foundUser._id
                            // })
                            // res.json()
                        }
                        else{
                            res.send({status:"Wrong password bruh!"})
                        }
                    })
                }
                
                else{
                    res.send({status:"Wrong email bruh!"})
                }
                // if(foundUser.password==pword){
                //     res.render("secrets")
                // }
                // else{
                //     res.send("wrong pasword")
                // }
            }
            else{
                res.send({status: "Wrong email bruh!"})
            }
        })
})

module.exports = router;