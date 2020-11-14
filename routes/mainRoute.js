const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
})



module.exports=router

// error handling example

// router.get('/', (req, res, next) => {
//     PhoneModel.find({}, (err, foundArr) => {
//         res.status(200).json(foundArr)
//     }).catch(err=>next(err))
// })