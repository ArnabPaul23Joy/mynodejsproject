const router = require('express').Router();

// require("dotenv").config()
// const express=require("express")
// const bodyParser=require("body-parser")
// const ejs=require("ejs")
// const app=express()
const mongoose =require("mongoose")
const bcrypt=require("bcrypt")
// const session=require("express-session")


let User = require("../models/userModel.js");
// const passport=require("passport")
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







router.route('/').post((req, res) => {
    const uName=req.body.email
    const pword=req.body.password
        // const user=new User({
        //     email: req.body.email,
        //     password: req.body.password
        // })
        // req.login(user,function(err){
        //     if(err){
        //         () => res.status(400).json('Error: ' + err);
        //     }
        //     else{
                
        //     }
        // })
    console.log("POST REQUEST LOGIN")
        User.findOne({email: uName},function(err,foundUser){
            if(!err){
                
                if(foundUser){
                    bcrypt.compare(pword,foundUser.password,function(err,result){
                        if (result==true){
                            console.log("")
                            .then(()=> res.json(foundUser.email+" "+foundUser._id))
                            .catch(err => res.json("wrong password bro!"));
                        }
                    })
                }
                // if(foundUser.password==pword){
                //     res.render("secrets")
                // }
                // else{
                //     res.send("wrong pasword")
                // }
            }
            else{
                res.json("wrong email bro!")
            }
        })
})

module.exports = router;