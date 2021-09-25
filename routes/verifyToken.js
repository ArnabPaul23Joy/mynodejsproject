const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
app.use(express.json());
app.use(cookieParser());
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var crypto = require("crypto");
let randNumber = require("../models/randomNumber.js");

module.exports = async function (req, res, next) {
  const token = req.cookies.token; 
  // console.log("hghghgh  " + token);
  if (!token) return res.send("Access Denied");
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    var u_iid = crypto.createHash("md5").update(req.user.u_id).digest("hex");
    await randNumber.findOne({ u_idHash: u_iid }, function (err, foundRand) {
      if (!err && !(!foundRand)) {
        if (token === foundRand.jToken) {
          req.user = decoded;
          next();
        } else {
          // console.log("11111");
          req.user = { status: "Invalid Token" };
          next();
        }
      } else {
        // console.log("222222222222");
        req.user = { status: "Invalid Token" };
        next();
      }
    });
    // console.log("3333333333333333");

  } catch (err) {
    // console.log("44444444444444");

    req.user = { status: "Invalid Token" };
    next();
  }
};
