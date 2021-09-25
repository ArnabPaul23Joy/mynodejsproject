const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());
const router = express.Router();

var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
let User = require("../models/userModel.js");
let randNumber = require("../models/randomNumber.js");
let TemporaryUserToken = require("../models/temporaryUserToken.js");
// console.log("register beyatch!");
var crypto = require("crypto");

var xoauth2 = require("xoauth2");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { google } = require("googleapis");

router.route("/").post(async (req, res) => {
  
  
  var emHash = req.body.id
  var tempRand=req.body.rFieldVal
  // console.log(emHash,tempRand)
  await TemporaryUserToken.findOne({ emHash: emHash }, async function (err, tempUserToken){
    if (tempUserToken.tempRand === tempRand && tempRand !== "undefined") {
      
    
      const newUser = new User({
        userName: tempUserToken.uName,
        email: tempUserToken.tempEmail,
        password: tempUserToken.password,
      });
      await newUser.save(async function (err) {
        if (!err) {
          // console.log("a,tempUserToken    " + tempUserToken);
          var u_iid = "";
          u_iid += newUser._id.toString();
          u_iid = crypto.createHash("md5").update(u_iid).digest("hex");
          var rFieldVal =
            u_iid + Math.random().toString(36).substring(7) + u_iid;
          rFieldVal = crypto.createHash("md5").update(rFieldVal).digest("hex");
          const token = jwt.sign(
            {
              status: "Success",
              u_id: newUser._id,
              [u_iid]: rFieldVal,
            },
            process.env.TOKEN_SECRET
          );

          // console.log("userRegister   " + token);

          await res.cookie("token", token, { httpOnly: true });
          await res.send({ status: "Successful", token: token });
          await randNumber.updateOne(
            { u_idHash: u_iid },
            { jToken: token },
            { upsert: true },
            function (err, docs) {
              if (err) {
                // console.log(err);
                res.send({ status: "Update Failed" });
              } else {
                // console.log("Original Doc : ", docs);
                // return
              }
            }
          );
        } else {
          // console.log("a,BALLLLL    " + err);
          await res.send({ status: "Wrong email or password!" });
        }
      });
    } else {
      await res.send({ status: "Wrong email or password!" });
    }

  })
  
  await TemporaryUserToken.deleteOne(
    { emHash: emHash },
    async function (err, tempUToken) {
        if(!err){
          // console.log(tempUToken);
        }
        else{
          // console.log(err);
        }
    }
  );  
});

module.exports = router;

