const router = require('express').Router()
const isAuthenticated = require('../middleware/isAuthenticated') 
const mailer = require('../controllers/mailer')
const scheduler = require('../controlllers/scheduler')
const Mail = require('../models/Mail')

router.post('/mail', isAuthenticated, mailer)

router.post('/schedule', isAuthenticated, scheduler)

router.get('/mail', isAuthenticated, (req,res)=>{
    Mail.find({sender: req.locals.decoded},(err,fMails)=>{
        if(!err)
            res.json(fMails)
        else
            res.json({message: "Mails Not Found", status: false})
    })
})

router.get('/schedule', isAuthenticated, (req,res)=>{
    Mail.find({sender: req.locals.decoded, body:{ scheduleSelector: {$ne: -1} }}).exec((err,fMails)=>{
        if(!err)
            res.json(fMails)
        else
            res.json({message: "Mails Not Found", status: false})
    })
})

module.exports = router
