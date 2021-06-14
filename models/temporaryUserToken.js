const mongoose = require("mongoose");

// const mdbUri = process.env.mongoDBURI;
// "mongodb://localhost:27017/ListingAppTodo";
// process.env.mongoDBURI;
// mongoose.connect(mdbUri, { useNewUrlParser: true });
const temporaryUserToken = new mongoose.Schema(
  { expireAfterSeconds: 3600 },
  {
    uName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    tempEmail: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    emHash: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    tempRand: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
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
// userSchema.plugin(findOrCreate)

const TemporaryUserToken = mongoose.model("TemporaryUserToken", temporaryUserToken);
module.exports = TemporaryUserToken;
