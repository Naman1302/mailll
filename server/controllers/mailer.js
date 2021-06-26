const Mail = require('../models/Mail')
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: '',
        pass: ''
    }
})

let mailOptions = {}

function Mailer(req,res){
    let data = {
        sender: req.locals.decoded._id,
        data: req.body.data,
        receivers: req.body.receivers
    }

    Mail.create(data,(err,nMail)=>{
        if(!err){
            transporter.sendMail(mailOptions,(err,data)=>{
                if(!err)
                    res.json(nMail)
                else{
                    nMail.remove()
                    res.json(false)
                }
            })
        }
        else
            res.json(false)
    })

}

module.exports = Mailer
