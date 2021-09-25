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
const verify = require("./verifyToken");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var crypto = require("crypto");

let User = require("../models/userModel.js");

let randNumber = require("../models/randomNumber.js");
let PostNote = require("../models/postModel.js");
const md5 = require("md5");
router.post("/", verify, async (req, res) => {
  if (req.user.status === "Invalid Token") {
    return res.send({ status: req.user.status });
  } else {
    var eml = "";
    var u_iid = crypto.createHash("md5").update(req.user.u_id).digest("hex");
    var rFieldVal = u_iid + Math.random().toString(36).substring(7) + u_iid;
    rFieldVal = crypto.createHash("md5").update(rFieldVal).digest("hex");
    var token = jwt.sign(
      {
        status: "Success",
        u_id: req.user.u_id,
        [u_iid]: rFieldVal,
      },
      process.env.TOKEN_SECRET
    );

    // console.log("token");
    // console.log(token);

    res.send({ status: "Logged out bitch!" });

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
