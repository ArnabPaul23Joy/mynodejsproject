const mongoose = require('mongoose');

const randomTokenSchema=new mongoose.Schema({
    u_idHash: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    jToken: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }
  },{
  timestamps: true,
})

//userSchema.plugin(encrypt, { secret: secret });
// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

//userSchema.plugin(encrypt, {secret: secret,encryptedFields:[password]})
// userSchema.plugin(passportLocalMongoose)
// userSchema.plugin(findOrCreate)


const RandomToken=mongoose.model("RandomToken",randomTokenSchema)
module.exports = RandomToken;
