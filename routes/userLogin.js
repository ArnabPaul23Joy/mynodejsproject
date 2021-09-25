const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
app.use(cors({credentials: true }));
app.use(express.json());
app.use(cookieParser());
const router = express.Router();
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
var crypto = require("crypto");
let bcrypt = require("bcrypt");
let bcrypt2 = require("bcrypt");

let User = require("../models/userModel.js");
let randNumber = require("../models/randomNumber.js");
const md5 = require("md5");

router.route("/").post((req, res) => {
  const uName = req.body.email;
  const pword = req.body.password;
  // console.log("Never gonna give you up")
  User.findOne({ email: uName }, async function (err, foundUser) {
    if (!err) {
      // console.log("found user " + uName);
      if (foundUser) {
        bcrypt.compare(pword, foundUser.password, async function (err, result) {
          if (result == true) {
            var u_iid = crypto
              .createHash("md5")
              .update(foundUser._id.toString())
              .digest("hex");
            var rFieldVal =
              u_iid + Math.random().toString(36).substring(7) + u_iid;
            rFieldVal = crypto
              .createHash("md5")
              .update(rFieldVal)
              .digest("hex");
            const token = jwt.sign(
              {
                status: "Success",
                u_id: foundUser._id,
                [u_iid]: rFieldVal,
              },
              process.env.TOKEN_SECRET
            );
            // console.log("u_iid   " + u_iid);
            // console.log("rFieldVal    " + rFieldVal);


            const ghghgh=await randNumber.updateOne(
              { u_idHash: u_iid },
              { jToken: token },
              { upsert: true },
              function (err, docs) {
                if (err) {
                  // console.log(err);
                  res.send({ status: "Update Failed" });
                } else {
                  // console.log("Original Doc : ", docs);
                }
              }
            );
            // console.log("gtok");
            // console.log(token);
            res.cookie("token", token, { httpOnly: true });
            res.send({ status: "Successful", token: token });
            
          } else {
            return res.send({ status: "Wrong password bruh!" });
          }
        });
      } else {
        return res.send({ status: "Wrong email bruh!" });
      }
    } else {
      return res.send({ status: "Wrong email bruh!" });
    }
  });
});

module.exports = router;
