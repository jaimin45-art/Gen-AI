const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlackList = require("../models/blacklist.model")

// @route post api/auth/register
// @desc register a user
// @access public
async function registerUserController(req,res){
    const {username,email,password} = req.body
    if(!username || !email || !password){
        return res.status(400).json({
            message:"Please Provide all the fields"
        })
    }
    const isUserExist = await userModel.findOne({
        $or:[{username},{email}]
    })

    if(isUserExist){
        return res.status(400).json({
            message:"Account already exists with this email or username"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000 // 1 day, jwt expiry ke saath match karta
})

    res.status(201).json({
        message:"User Registered Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

async function LoginUserController(req,res){
    const {email,password}=req.body
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
})
    res.status(200).json({
        message:"User Looged In Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

async function logoutUserController(req,res){
    const token = req.cookies.token
    if(token){
        await tokenBlackList.create({token})
    }
    res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
})

    res.status(200).json({
        message:"User Logged Out Successfully"
    })
}

// Get the current logged in user details
async function getMeController(req,res){
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message:"User Details Fetched Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

module.exports = {
    registerUserController,
    LoginUserController,
    logoutUserController,
    getMeController
}

