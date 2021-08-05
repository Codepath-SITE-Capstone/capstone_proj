
//Obehi
const express = require("express")
const Giving = require("../models/giving")
const security = require("../middleware/security")
const router = express.Router()

//Obehi: This creates new giving entries. We want the authenticated user to enter something into the give form or the give database (this is why we use the 
// (POST) request
//security.requireAuthenticatedUser,
router.post("/",  security.requireAuthenticatedUser, async(req, res, next)=>{
    try {
        //res.locals.user
        const user = res.locals.user
        const givings = await Giving.createGiving({ newGiving:req.body, user })
        return res.status(201).json({ givings })
        
    } catch (error) {
        next(error)
    }
})
router.post("/", security.requireAuthenticatedUser, async(req, res, next)=>{
    const user = res.locals.user
    const redeem = await Giving.redeemPoints({user})
    return res.status(201).json({redeem})
})




module.exports = router;