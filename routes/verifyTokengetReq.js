const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
// app.use(cors({ origin: "http://localhost:5000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var crypto = require("crypto");
let randNumber = require("../models/randomNumber.js");
module.exports = async function (req, res, next) {
  // const token=req.header('auth-token')
  // console.log("Cookies: ", req.cookies);
  const token = req.cookies.token;
  console.log("hghghgh  " + token);
  if (!token) return res.send("Access Denied");
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    // var u_iid=""
    //                     bcrypt.genSalt(10, function(err, salt) {
    //                     bcrypt.hash(req.user.email, salt, function(err, hash) {
    //                         u_iid=hash
    //                         })

    //                     })
    // var rField=Math.random().toString(36).substring(7)
    // var rFieldVal=+u_iid+Math.random().toString(36).substring(7)+u_iid
    //  bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash(rFieldVal, salt, function(err, hash) {
    //         rFieldVal=hash
    //         })

    //     })

    var u_iid = crypto.createHash("md5").update(req.user.u_id).digest("hex");
    console.log("u_iid   " + u_iid);
    // var rFieldVal=u_iid+Math.random().toString(36).substring(7)+u_iid
    // rFieldVal = crypto.createHash('md5').update(rFieldVal).digest('hex');
    await randNumber.findOne({ u_idHash: u_iid }, function (err, foundRand) {
      if (!err && !(!foundRand)) {
        console.log("foundRand.jToken   " + foundRand.jToken);
        if (token === foundRand.jToken) {
          req.user = decoded;
          next();
        } else {
          console.log("problem 1");
          console.log(token);
          console.log(foundRand.jToken);
          req.user = { status: "Invalid Token" };
          next();
        }
      } else {
        console.log("problem 2");
        req.user = { status: "Invalid Token" };
        next();
      }
    });
    console.log(req.user);
    next();
  } catch (err) {
    console.log("problem 3");
    req.user = { status: "Invalid Token" };
    next();
  }
};
