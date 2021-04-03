const jwt =-require('jsonwebtoken')
module.exports= function (req, res, next){
    // const token=req.header('auth-token')
    const token=req.body.token
    console.log("hghghgh  "+token)
    if(!token) return res.status(401).send('Access Denied')
    try{
        var verified=jwt.verify(token, process.env.TOKEN_SECRET,{
 issuer:  i,
 subject:  s,
 audience:  a,
 expiresIn:  "12h",
 algorithm:  ["RS256"]
})
        console.log("verifired   ")
        console.log(verified)
        // req.user=verified
        next()
    }
    catch(err){
        console.log(err)
        res.send("Invalid Token")
    }

}