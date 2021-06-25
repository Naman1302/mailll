const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const JWT_SECRET = process.env.JWT_SECRET||'gsfi894wt43hiwhfhs8fwb3_efuwbfewf'


async function login(req,res){
    const hash = await bcrypt.hash(req.body.password,10)
    const UserData = {
        password: hash,
        username: req.body.username
    }

    User.create(UserData,async (err,nUser)=>{
        if(!err){
            console.log(nUser)
            const token = await jwt.sign({_id:nUser._id},JWT_SECRET)
            res.cookie("ACCESS_TOKEN",token,{
                httpOnly: true
            });
            res.json({username: nUser.username})
        }else{
            console.log(err)
            res.json(false)
        }
    })
}

module.exports = login
