const jwt = require("jsonwebtoken");
const config = require('config');

const auth = async (req,res,next) =>{
    const token = req.header('jwt-token')
    if(!token){
        res.status(401).json("Authorization Denied")
    }
    try {
        const decoded = jwt.verify(token,config.get('secretKey'));
        req.user = decoded.user;
        next()
    } catch (error) {
        console.error(error.message)
        res.status(401).json({msg:"Token is invalid"});
    }
}

module.exports = auth