const mongoose = require("mongoose");

const mdbUri = "mongodb://localhost:27017/ListingAppTodo";
// process.env.mongoDBURI;
// mongoose.connect(mdbUri, { useNewUrlParser: true });
const temporaryUserToken = new mongoose.Schema(
  {
    uName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    }
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
    expire_at: { type: Date, default: Date.now, expires: 3600 },
  }
);

//userSchema.plugin(encrypt, { secret: secret });
// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

//userSchema.plugin(encrypt, {secret: secret,encryptedFields:[password]})
// userSchema.plugin(passportLocalMongoose)
// userSchema.plugin(findOrCreate)

const TemporaryUserToken = mongoose.model("TemporaryUserToken", temporaryUserToken);
module.exports = TemporaryUserToken;
