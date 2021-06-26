const router = require('express').Router()
const fURL = process.env.fURL||'http://localhost:3000/'
const login = require('../controllers/login')
const register = require('../controllers/register')
const logout = require('../controllers/logout')
const isAuthenticated = require('../middleware/isAuthenticated') 

router.get('/' ,isAuthenticated, (req , res)=>{
    res.redirect(fURL)
})

router.get('/login' , (req , res)=>{
    res.redirect(fURL+'login')
})

router.get('/register' , (req , res)=>{
    res.redirect(fURL+'register')
})

router.get('/logout', logout)

router.post('/login', login)

router.post('/register', register)

module.exports  = router