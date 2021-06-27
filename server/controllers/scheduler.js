//* Scheduled mails 
const schedule = require('node-schedule')
const nodemailer = require('nodemailer')
const Mail = require('../models/Mail')

function scheduler(req, res){

    let transpoter = nodemailer.createTransport({

    })
    let mailOptions = {}
    let cron

    switch(req.body.scheduleSelector){
        case 0: cron = '*/30 * * * * *'; break;
        case 1: cron = '0 0 * * 0'; break;
        case 2: cron = '0 0 1 * *'; break;
        case 3: cron = '0 0 1 1 *'; break;
    }

    Mail.create(data,(err,nMail)=>{
        if(!err){
            schedule.scheduleJob(nMail._id,cron,transpoter.sendMail(mailOptions))
            res.json(true)
        }
        else
            res.json(false)
    })
}

module.exports = scheduler 
