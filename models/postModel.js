const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    u_id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
    postTitle: String,
    postContent: String,
},{
  timestamps: true,
})

//userSchema.plugin(encrypt, { secret: secret });
// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

//userSchema.plugin(encrypt, {secret: secret,encryptedFields:[password]})
// userSchema.plugin(passportLocalMongoose)
// userSchema.plugin(findOrCreate)


const Post=mongoose.model("Post",userSchema)
module.exports = Post;
