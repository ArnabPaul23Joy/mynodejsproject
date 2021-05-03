
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
var crypto = require('crypto');
let randNumber = require("../models/randomNumber.js");
module.exports= function (req, res, next){
    // const token=req.header('auth-token')
    const token=req.body.params.token
    console.log("hghghgh  "+token)
    if(!token) return res.send('Access Denied')
    try{
        const decoded=jwt.verify(token, process.env.TOKEN_SECRET)
        req.user=decoded
        // var u_iid=""
        //                     bcrypt.genSalt(10, function(err, salt) {
        //                     bcrypt.hash(req.user.email, salt, function(err, hash) {
        //                         u_iid=hash
        //                         })
                                    
        //                     })
                        // var rField=Math.random().toString(36).substring(7)
                        // var rFieldVal=+u_iid+Math.random().toString(36).substring(7)+u_iid
                        //  bcrypt.genSalt(10, function(err, salt) {
                        //     bcrypt.hash(rFieldVal, salt, function(err, hash) {
                        //         rFieldVal=hash
                        //         })
                                    
                        //     })
        
                        var u_iid = crypto.createHash('md5').update(req.user.email).digest('hex');
                        // var rFieldVal=u_iid+Math.random().toString(36).substring(7)+u_iid
                        // rFieldVal = crypto.createHash('md5').update(rFieldVal).digest('hex');
        randNumber.find({u_idHash:u_iid}, function(err, foundRand){
            if(!err){
                if(token===foundRand.jToken){
                    req.user=decoded
                    next()
                }
                else{
                    req.user={status: "Invalid Token"};
                    next()

                }
            }
            else{
                req.user={status: "Invalid Token"};
                next()
            }
        })
        console.log(req.user)
        next()
    }
    catch(err){
        req.user={status: "Invalid Token"};
        next()
    }

}