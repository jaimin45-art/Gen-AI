const express = require('express')
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = express.Router()

// @route post api/auth/register
// @desc Register a user
// @access public
authRouter.post("/register",authController.registerUserController)


authRouter.post("/login",authController.LoginUserController)


authRouter.get("/logout",authController.logoutUserController)

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController )


module.exports = authRouter