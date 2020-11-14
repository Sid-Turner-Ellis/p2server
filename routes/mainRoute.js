const express = require('express')
const router = express.Router()
let messageModel = require('../models/messageSchema')

const nodemailer = require("nodemailer");



router.post('/',async (req,res)=>{
  var someModel_instance = new messageModel(req.body);
  someModel_instance.save((err)=>{
    if (err) return handleError(err);
  });
  const {name,contact, message} = req.body

  const email = `
    <p>name: ${name}</P>
    <p>contact: ${contact}</P>
    <p>message: ${message}</P>
    `

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'in-v3.mailjet.com',
      port: 587,
      auth: {
          user: '230f17c8f7fdef3fc76a4ef6ff6b75da',
          pass: '53aec7e3085b45f5b2d6a1636c46ce53'
      }
  });

  let info = await transporter.sendMail({
    from: '"You" <sidbymuta@gmail.com>', // sender address
    to: "sid.turner.ellis@gmail.com,sidsenquiry@yahoo.com", // list of receivers
    subject: "New enquiry", // Subject line
    html: email, // html body
  });

  // add error handling to this shiet
  console.log(info);
  res.end()


})



module.exports=router

// error handling example

// router.get('/', (req, res, next) => {
//     PhoneModel.find({}, (err, foundArr) => {
//         res.status(200).json(foundArr)
//     }).catch(err=>next(err))
// })