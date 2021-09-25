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
  await bcrypt.genSalt(3, async function (err, salt) {
    await bcrypt.hash(req.body.password, salt, async function (err, hash) {
      var u_iid = crypto
        .createHash("md5")
        .update(req.body.email.toString())
        .digest("hex");
      var tempRand = crypto.randomBytes(64).toString("hex");
      host = req.get("host")
      var tempEmail = req.body.email.toString();
      // console.log("req.body.email    " + req.body.email.toString());
      const tempUser = {
        tempEmail,
        hash,
        u_iid,
        tempRand,
      };

      const GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID;
      const GMAIL_CLIENT_SECRET= process.env.GMAIL_CLIENT_SECRET
      const REFRESH_TOKEN = process.env.refreshTokenForgmail
      const oAuth2Client = new google.auth.OAuth2(
        GMAIL_CLIENT_ID,
        GMAIL_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
      );
      oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


      const accessToken = await oAuth2Client.getAccessToken();
      // console.log("No need for accessTokn!!!!!!  " + accessToken);
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.serverEmail,
          clientId: GMAIL_CLIENT_ID,
          clientSecret: GMAIL_CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      // console.log(tempUser.tempEmail, tempUser.tempRand);
      await TemporaryUserToken.findOneAndUpdate(
        { tempEmail: tempEmail },
        {
          $set: {
            uName: req.body.uName.toString(),
            tempEmail: tempEmail,
            password: hash,
            emHash: u_iid,
            tempRand: tempRand,
          },
        },
        { upsert: true },
        async function (err) {
          if (!err) {

            link =
              "http://" +
              req.get("host") +
              "/confirmation?id=" +
              u_iid +
              "&rFieldVal=" +
              tempRand;
            var mailOptions = {
              from: '"TodoListApp" <taskmaster65f826@gmail.com>',
              to: tempEmail,
              subject: "Please confirm your Email account",
              html:
                "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
                link +
                ">Click here to verify</a>",
            };
            await transport.sendMail(
              mailOptions,
              async function (error, response) {
                if (error) {
                  // console.log(error);
                  await res.send({ status: "Wrong email or password!" });
                } else {
                  // console.log(response);
                  await res.send({ status: "Check your email please" });
                }
              }
            );
          } else {
            await res.send({ status: "Sorry, Something is wrong!" });
          }
        }
      );
    });
  });
});

module.exports = router;
