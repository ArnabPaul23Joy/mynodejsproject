
const jwt=require("jsonwebtoken")
module.exports= function (req, res){
    // const token=req.header('auth-token')
    const token=req.body.token
    console.log("hghghgh  "+token)
    if(!token) return res.status(401).send('Access Denied')
    try{
        const decoded=jwt.verify(token, process.env.TOKEN_SECRET)
        return decoded
    }
    catch(err){
        return {status: "Invalid Token"};       
    }

}