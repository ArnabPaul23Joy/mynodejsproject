const mongoose = require('mongoose');

const mdbUri = process.env.mongoDBURI;
const findOrCreate = require("mongoose-findorcreate");
mongoose.connect(mdbUri, { useNewUrlParser: true });
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
