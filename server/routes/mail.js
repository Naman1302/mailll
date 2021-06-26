const router = require('express').Router()
const isAuthenticated = require('../middleware/isAuthenticated') 
const mailer = require('../controllers/mailer')
const scheduler = require('../controllers/scheduler')

router.post('/mail', isAuthenticated, mailer)
router.post('/schedule', isAuthenticated, scheduler)

module.exports = router