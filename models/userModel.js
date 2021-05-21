const mongoose = require('mongoose');

const findOrCreate = require("mongoose-findorcreate");
mongoose.connect("mongodb://localhost:27017/ListingAppTodo",{useNewUrlParser:true})
const userSchema = new mongoose.Schema(
  {
    userName: String,
    email: {
      type: String,
      // required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      // required: true,
      trim: true,
      minlength: 8,
    },

    googleId: {
      type: String,
      trim: true,
      minlength: 8,
    },
    facebookID: {
      type: String,
      trim: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
  }
);

//userSchema.plugin(encrypt, { secret: secret });
// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

//userSchema.plugin(encrypt, {secret: secret,encryptedFields:[password]})
// userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)


const User=mongoose.model("User",userSchema)
module.exports = User;
