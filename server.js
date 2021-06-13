const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
// const publicPath = path.join(__dirname, '..', 'public');
require('dotenv').config();
const cors = require("cors");
// const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
var crypto = require("crypto");
const cookieParser = require("cookie-parser");
// const path = require("path");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT||5000;

// app.use(cors());
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: false}));
// app.use("/", routes);
// app.use(express.json());
// app.use(cookieParser());
// const router = express.Router();
// console.log

let User = require("./models/userModel.js");
let randNumber = require("./models/randomNumber.js");
// const passport = require("passport");
// const passportLocalMongoose=require("passport-local-mongoose")
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
// const findOrCreate = require("mongoose-findorcreate");
const md5 = require("md5");

// app.use(passport.initialize());
// app.use(passport.session());
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const path = require("path");
// app.use(cors({credentials: true }));
// app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'build')));
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);
// "https://tasklistwebappreactjwtauth.herokuapp.com/"+str(process.env.PORT)
// app.use(express.static(path.join(__dirname, 'client/build')));

const mdbUri = process.env.mongoDBURI;
mongoose.connect(mdbUri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// const exercisesRouter = require('./api/exercises');
const userLogin = require('./routes/userLogin');
const LoginWithGoogle = require('./routes/LoginGoogle.jsx');
const userRegister = require('./routes/userRegister');
const getPosts = require('./routes/getPosts');
const postNote = require('./routes/postNote');
const deleteNote = require('./routes/deleteNote');
const logOut = require('./routes/logOut');
const userLoginWithToken = require('./routes/userLoginWithToken');
const verify = require("./routes/verify");
// const confirmation = require("./routes/confirmation");
// app.use('/exercises', exercisesRouter);

app.use('/login', userLogin);
app.use('/googlesignin/', LoginWithGoogle);
app.use('/register', userRegister);
app.use('/getnotes/', getPosts);
app.use('/post', postNote);
app.use('/deletenote', deleteNote);
app.use('/logout', logOut);
app.use("/loginWithToken", userLoginWithToken)
app.use("/verify", verify);
// app.use("/confirmation", confirmation);


app.use(express.static("client/build"));

app.get("/", function (req, res) {
  res.sendFile("index.html", {
    root: path.join(__dirname, "/client/build/"),
  });
});
app.get("/about", function (req, res) {
  res.sendFile("index.html", {
    root: path.join(__dirname, "/client/build/"),
  });
});
app.get("/confirmation", function (req, res) {
  res.sendFile("index.html", {
    root: path.join(__dirname, "/client/build/"),
  });
});
console.log(process.env.NODE_ENV);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// "test": "echo \"Error: no test specified\" && exit 1",
    