const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
// const publicPath = path.join(__dirname, '..', 'public');
require('dotenv').config();

const app = express();
const port = process.env.PORT||5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'build')));
// app.use(express.static(path.join(__dirname, 'client/build')));
const uri = "mongodb://localhost:27017/ListingAppTodo";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
// const exercisesRouter = require('./api/exercises');
const userLogin = require('./routes/userLogin');
const userRegister = require('./routes/userRegister');
const getPosts = require('./routes/getPosts');
const postNote = require('./routes/postNote');
const deleteNote = require('./routes/deleteNote');
const logOut = require('./routes/logOut');
// app.use('/exercises', exercisesRouter);

app.use('/login', userLogin);
app.use('/register', userRegister);
app.use('/getnotes', getPosts);
app.use('/post', postNote);
app.use('/deletenote', deleteNote);
app.use('/logout', logOut);

// app.get('/*', function (req, res) {
//    res.sendFile(path.join(__dirname, 'build', 'index.html'));
//  });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname +'/../client/public/index.html'))
// });

// if (process.env.NODE_ENV === 'production') {
    console.log("production mode!")
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
//   const path = require('path');
//   app.get('/', (req, res) => {
//     console.log("pro mode!")
//     res.sendFile('client/build/index.html');
//   });
// }

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// "test": "echo \"Error: no test specified\" && exit 1",
    