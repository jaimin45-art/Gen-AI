const jwt = require("jsonwebtoken");
const tokenBlackList = require("../models/blacklist.model")

async function authUser(req, res, next) {
    const token = req.cookies?.token;  // ✅ FIXED

    if (!token) {
        return res.status(401).json({
            message: "Token Not Found"
        });
    }

    const isTokenBlackListed = await tokenBlackList.findOne({
        token
    })
    if(isTokenBlackListed){
        return res.status(401).json({
            message:"Token is BlackListed.Please Login Again."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
}

module.exports = { authUser };