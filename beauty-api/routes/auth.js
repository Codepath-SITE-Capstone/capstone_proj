const express = require("express")
const User = require("../models/user")
const router = express.Router()
const security = require("../middleware/security")

router.post("/login", async (req, res, next)=>{
    try {
        const user = await User.login(req.body)
        return res.status(200).json({user})
    } catch (err) {
        next(err)
    }
})

router.post("/register", async (req,res, next)=>{
    try {
        //get user's email and password
        //and create a new user in db
        const user = await User.register(req.body)
        return res.status(201).json({user})
    } catch (err) {
        next(err)
    }
})

router.get("/me", security.requireAuthenticatedUser, async (req, res, next)=>{
    try {
        const {username} = res.locals.username
        const user = await User.fetchUserByUsername(username)
        const publicUser = User.makePublicUser(user)
        return res.status(200).json({ user: publicUser})
        
    } catch (err) {
        next(err)
    }
})

module.exports = router