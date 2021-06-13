const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
app.use(cors({ credentials: true }));
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
const router = express.Router();

var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
let User = require("../models/userModel.js");
let randNumber = require("../models/randomNumber.js");
let TemporaryUserToken = require("../models/temporaryUserToken.js");
console.log("register beyatch!");
var crypto = require("crypto");
// require("dotenv").config()
// const express=require("express")
// const bodyParser=require("body-parser")
// const ejs=require("ejs")
// const app=express()
var xoauth2 = require("xoauth2");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { google } = require("googleapis");
router.route("/").get(async (req, res) => {
    console.log(req.query)
})