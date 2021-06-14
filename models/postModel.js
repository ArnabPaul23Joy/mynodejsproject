const mongoose = require('mongoose');
// const mdbUri = process.env.mongoDBURI;
// "mongodb://localhost:27017/ListingAppTodo";
// 
// mongoose.connect(mdbUri, { useNewUrlParser: true });
const userSchema=new mongoose.Schema({
    u_id: {
        type: String,
        required: true,
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
