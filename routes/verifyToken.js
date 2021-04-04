
const jwt=require("jsonwebtoken")
module.exports= function (req, res, next){
    // const token=req.header('auth-token')
    const token=req.body.token
    console.log("hghghgh  "+token)
    if(!token) return res.status(401).send('Access Denied')
    try{
        const decoded=jwt.verify(token, process.env.TOKEN_SECRET)
        req.user=decoded
        next()
    }
    catch(err){
        req.user={status: "Invalid Token"};
        next()
    }

}