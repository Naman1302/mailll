const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const JWT_SECRET = process.env.JWT_SECRET||'gsfi894wt43hiwhfhs8fwb3_efuwbfewf'


async function login(req,res){
    User.findOne({username: req.body.username},async(err,fUser)=>{
        if(!err && await bcrypt.compare(req.body.password,fUser.password)){
            const token = await jwt.sign({_id:fUser._id},JWT_SECRET)
            res.cookie("ACCESS_TOKEN",token,{
                httpOnly: true
            });
            res.json({username: fUser.username})
        }else{
            console.log(err)
            res.json(false);
        }
    })
}

module.exports = login
