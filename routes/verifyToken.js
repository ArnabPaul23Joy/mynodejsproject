
const jwt=require("jsonwebtoken")

let randNumber = require("../models/randomNumber.js");
module.exports= function (req, res, next){
    // const token=req.header('auth-token')
    const token=req.body.token
    console.log("hghghgh  "+token)
    if(!token) return res.status(401).send('Access Denied')
    try{
        const decoded=jwt.verify(token, process.env.TOKEN_SECRET)
        req.user=decoded
        var u_iid=""
                            bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(req.user.u_id, salt, function(err, hash) {
                                u_iid=hash
                                })
                                    
                            })
                        // var rField=Math.random().toString(36).substring(7)
                        // var rFieldVal=+u_iid+Math.random().toString(36).substring(7)+u_iid
                        //  bcrypt.genSalt(10, function(err, salt) {
                        //     bcrypt.hash(rFieldVal, salt, function(err, hash) {
                        //         rFieldVal=hash
                        //         })
                                    
                        //     })
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