
const jwt=require("jsonwebtoken")

const bcrypt=require("bcrypt")
let randNumber = require("../models/randomNumber.js");
module.exports= function (req, res, next){
    // const token=req.header('auth-token')
    const token=req.body.token
    console.log("hghghgh  "+token)
    if(!token) return res.status(401).send('Access Denied')
    var u_iid=""
            bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(req.user.u_id, salt, function(err, hash) {
                                u_iid=hash
                                })
                                    
                            })
        randNumber.find({u_idHash: u_iid},function(err,foundRandom){
            if(!err){
                if(token===foundRandom.jToken){
                    try{
                        const decoded=jwt.verify(token, process.env.TOKEN_SECRET)
                        req.user=decoded
                        console.log(req.user)
                        next()
                    }
                    catch(err){
                        req.user={status: "Invalid Token"};
                        next()
                    }
                }
            }
            else{
                req.user={status: "Invalid Token"}
                next()
            }
        })
    

}