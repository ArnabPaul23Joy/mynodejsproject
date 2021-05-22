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
 
  console.log("Cookies: ", req.cookies);
  const token = req.cookies.token; 
  console.log("hghghgh  " + token);
  try{
  var vvvv = jwt.verify(
    "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQzZmZiYjhhZGUwMWJiNGZhMmYyNWNmYjEwOGNjZWI4ODM0MDZkYWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNTE3OTQyMzM2NDc0LWxybnZ1dHVuNGJibmV1YnViOHBsbjVmMXN0OHUwNG9tLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNTE3OTQyMzM2NDc0LWxybnZ1dHVuNGJibmV1YnViOHBsbjVmMXN0OHUwNG9tLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEwODc1NTIzODE3Njg4Nzk5NzI4IiwiaGQiOiJzdHVkZW50LmNzZS5kdS5hYy5iZCIsImVtYWlsIjoiMjAxNi03MTQtNDE0QHN0dWRlbnQuY3NlLmR1LmFjLmJkIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ2LXc3RDZiWE5BeTN0dU9kdzdnQThBIiwibmFtZSI6IkFybmFiIFBhdWwgSm95IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSnpqQVF4dS1wNWJVRjVNOVY2NDh2cUJ5U0UtYk1sclRUWHA3cVlwPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkFybmFiIFBhdWwiLCJmYW1pbHlfbmFtZSI6IkpveSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjIxNzAyMTcxLCJleHAiOjE2MjE3MDU3NzEsImp0aSI6IjdiNGJjYWM2MmM0NGY3MmE0NDdmMmZhYThhZDY5Y2M4MmZjYTc4MWEifQ.i59nuILyeN_t5Zo6S7SanI70UuaorIuTXwHZs7qIVue5fiONeeZX_KwLfpY_-2HViwhVTKu9aOMfRK8yMePITr2iGw79B3yHP5KziPgg6_xmbR91Jr1lVKHIgD_MpXvznZhmDv06MfhqgK6pL4n389lq4FXKA4RI6-CJHcUZMNkeZ1247XzlQAaDHu9W-NcvVM6xnNrZ5L-GyM0YoiJOaFMTVLKri0mDsbobFTKj6iK6H2c-CB6RJKUxyGAWDNjjDTgQ8R3vy069I6d93seRbrKspy45X8BstM4r4N51uoQBrGVcrLBNTG-CYjLUC60o5zHboK8kFJA-P0tAOmER_w",
    process.env.TOKEN_SECRET
  );
  console.log("vvvvvvvv  " + vvvv);

  }
  catch(err){
  console.log("vvvvvvvv  " + err);

  }

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
    // var rFieldVal=u_iid+Math.random().toString(36).substring(7)+u_iid
    // rFieldVal = crypto.createHash('md5').update(rFieldVal).digest('hex');
    await randNumber.findOne({ u_idHash: u_iid }, function (err, foundRand) {
      if (!err && !(!foundRand)) {
        if (token === foundRand.jToken) {
          req.user = decoded;
          next();
        } else {
          console.log("11111");
          req.user = { status: "Invalid Token" };
          next();
        }
      } else {
        console.log("222222222222");
        req.user = { status: "Invalid Token" };
        next();
      }
    });
    console.log("3333333333333333");

    console.log(req.user);
    next();
  } catch (err) {
    console.log("44444444444444");

    req.user = { status: "Invalid Token" };
    next();
  }
};
