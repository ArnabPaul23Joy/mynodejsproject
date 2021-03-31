const router = require('express').Router();

let User = require("../models/userModel.js");
console.log("register beyatch!")
// require("dotenv").config()
// const express=require("express")
// const bodyParser=require("body-parser")
// const ejs=require("ejs")
// const app=express()
const mongoose =require("mongoose")
const bcrypt=require("bcrypt")
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


router.route('/').post((req, res) => {

        // const uName=req.body.email
        // const pword=req.body.password
       
        // req.login(user,function(err){
        //     if(err){
        //         () => res.status(400).json('Error: ' + err);
        //     }
        //     else{
                
        //     }
        // })
        bcrypt.genSalt(3, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                const newUser=new User({
                    userName: req.body.uName,
                    email: req.body.email,
                    password: hash
                })

                newUser.save(function(err){
                    if(!err){
                        res.json(newUser._id+" "+newUser.email)
                    }
                    else{
                        res.status(400).json('Error: ' + err)
                    }
                })
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
    })

module.exports = router;