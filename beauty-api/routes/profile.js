const express = require("express")
const Profile = require("../models/profile")
const router = express.Router()
const security = require("../middleware/security")
const tokens = require("../utils/tokens")

router.get("/", security.requireAuthenticatedUser, async (req, res, next)=>{
    try {
        const user =res.locals.user
        const recycleJson = await Profile.fetchNumberRecycled({ user })
        const donationJson = await Profile.fetchNumberDonations({ user })
       // console.log(recycled[0].quantity)
       //var recycled = 0
       var recycleNumber = 0
       //var donations =0
       var donationNumber =0
       donationJson.forEach(function (item,index){
        console.log(donationJson[index].quantity)
    //    donations += donationJson[index].quantity
       donationNumber += donationJson[index].quantity
    })
       recycleJson.forEach(function (item,index){
            // console.log(recycled[index].quantity)
        //    recycled += recycleJson[index].quantity
        recycleNumber += recycleJson[index].quantity

        })
        // return res.status(200).json({ donations, recycled })
        return res.status(200).json({ donationNumber, recycleNumber })

    } catch (error) {
        console.log(error)
        next(error)
    }
} )

// Obehi: This gets the giving entries of the user
router.get("/donations", security.requireAuthenticatedUser, async(req,res,next)=>{
    try{
        const user = res.locals.user
        // console.log(user)
        const donations = await Profile.fetchDonations({ user })
        
        
        // donations.forEach(function (item,index){
        //     var relativeTime = require('dayjs/plugin/relativeTime')
        //     dayjs.extend(relativeTime)
        //     dayjs().to(dayjs( (donations[index].created_at)
            
        //     ))
        // })


        // console.log(donations)
        return res.status(200).json({ donations })
    }catch(error){
        console.log(error)
        next(error)
    }
 
})

router.post("/", security.requireAuthenticatedUser, async (req, res, next)=>{
    try {
        const user = res.locals.user
        console.log(user)
        const url = await Profile.addPic({user,url: req.body})
        return res.status(200).json({ url })
    } catch (err) {
        next(err)
    }
})

//Obehi: This gets the recycling entries of the user
router.get("/recycles", security.requireAuthenticatedUser, async(req,res,next)=>{
    try{
        const user = res.locals.user
        console.log(user)
        const recycles = await Profile.fetchRecycles({ user })
        console.log(recycles)
        return res.status(200).json({ recycles })
    }catch(error){
        console.log(error)
        next(error)
    }
    
})




module.exports = router