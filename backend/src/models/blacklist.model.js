const mongoose = require("mongoose")

const blackListTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to be add in blacklist"]
    }
},{
    timestamps:true  
})

const tokenBlackList = mongoose.model("blackListTokens", blackListTokenSchema)

module.exports = tokenBlackList