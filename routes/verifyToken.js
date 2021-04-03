const jwt =-require('jsonwebtoken')
module.exports= function (req, res, next){
    // const token=req.header('auth-token')
    const token=req.body.token
    // console.log("hghghgh  "+token)
    if(!token) return res.status(401).send('Access Denied')
    try{
        var verified=jwt.verify(token, process.env.TOKEN_SECRET)
        console.log("verifired   "+verified)
        // req.user=verified
        next()
    }
    catch(err){
        res.send("Invalid Token")
    }

}