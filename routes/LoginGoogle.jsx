const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const app = express();
app.use(express.json());
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cookieParser());
const router = express.Router();

const mongoose = require("mongoose");
var crypto = require("crypto");
let bcrypt = require("bcrypt");
let bcrypt2 = require("bcrypt");
let User = require("../models/userModel.js");
let randNumber = require("../models/randomNumber.js");
const findOrCreate = require("mongoose-findorcreate");
const md5 = require("md5");
router.get("/", function (req, res) {
  const client = new OAuth2Client(process.env.CLIENT_ID);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: req.query.token,
      audience: process.env.CLIENT_ID,
      
    });
    const payload = ticket.getPayload();
    console.log(payload);
    var stttt = "";
    
    await User.findOne({ email: payload["email"] }, async function (err, nUsr) {
      console.log("err  " + err);
      console.log("nUsr   " + nUsr);
      if (!nUsr) {
        stttt += payload["email"] + payload["sub"];
        var hash = crypto.createHash("md5").update(stttt).digest("hex");
        newUser = new User({
          userName: payload["name"],
          email: payload["email"],
          password: hash,
          googleId: payload["sub"],
        });
        await newUser.save(async function (err) {
          if (!err) {
            var u_iid = "";
            u_iid += newUser._id.toString();
            u_iid = crypto.createHash("md5").update(u_iid).digest("hex");
            var rFieldVal =
              u_iid + Math.random().toString(36).substring(7) + u_iid;
            rFieldVal = crypto
              .createHash("md5")
              .update(rFieldVal)
              .digest("hex");
            const token = jwt.sign(
              {
                status: "Success",
                u_id: newUser._id,
                [u_iid]: rFieldVal,
              },
              process.env.TOKEN_SECRET
            );

            console.log("userRegister   " + token);

            res.cookie("token", token, { httpOnly: true });
            res.send({ status: "Successful", token: token });
            await randNumber.updateOne(
              { u_idHash: u_iid },
              { jToken: token },
              { upsert: true },
              function (err, docs) {
                if (err) {
                  console.log(err);
                  res.send({ status: "Update Failed" });
                } else {
                  console.log("Original Doc : ", docs);
                }
              }
            );
          } else {
            return res.send("Wrong email or password!");
          }
        });
      } else {
        var u_iid = "";
        u_iid += nUsr._id.toString();
        u_iid = crypto.createHash("md5").update(u_iid).digest("hex");
        var rFieldVal = u_iid + Math.random().toString(36).substring(7) + u_iid;
        rFieldVal = crypto.createHash("md5").update(rFieldVal).digest("hex");
        const token = jwt.sign(
          {
            status: "Success",
            u_id: nUsr._id,
            [u_iid]: rFieldVal,
          },
          process.env.TOKEN_SECRET
        );

        console.log("userRegister   " + token);

        res.cookie("token", token, { httpOnly: true });
        res.send({ status: "Successful", token: token });
        await randNumber.updateOne(
          { u_idHash: u_iid },
          { jToken: token },
          { upsert: true },
          function (err, docs) {
            if (err) {
              console.log(err);
              res.send({ status: "Update Failed" });
            } else {
              console.log("Original Doc : ", docs);
            }
          }
        );
      }
    });
    
  }
  verify().catch(console.error);
});

module.exports = router;
