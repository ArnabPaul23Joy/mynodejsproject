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
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var crypto = require("crypto");
let randNumber = require("../models/randomNumber.js");
const verify = require("./verifyToken");

let User = require("../models/userModel.js");
const md5 = require("md5");

router.post("/", verify, async (req, res) => {
  if (req.user.status === "Invalid Token") {
    // console.log("6666666666666");

    return res.send({ status: "Invalid Token" });
  } else {
    var u_iid = crypto.createHash("md5").update(req.user.u_id).digest("hex");
    var rFieldVal = u_iid + Math.random().toString(36).substring(7) + u_iid;
    rFieldVal = crypto.createHash("md5").update(rFieldVal).digest("hex");
    const token = jwt.sign(
      {
        status: "Success",
        u_id: req.user.u_id,
        [u_iid]: rFieldVal,
      },
      process.env.TOKEN_SECRET
    );

    // console.log("token");
    // console.log(token);
    res.cookie("token", token, { httpOnly: true });
    res.send({ status: "Success", token: token });
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
        }
      }
    );
  }
});

module.exports = router;
