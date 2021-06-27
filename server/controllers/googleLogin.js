const User = require('../models/User')

async function googleLogin(req,res){
    let user=User.findOne({email: req.body.email});

    if(user) {
        res.json({email: user.email, token: req.body.token})
    }
    else {
        const data = {
            email:req.body.email
        }
        User.create(data, async(err, nUser)=> {
            if(!err){
                console.log(nUser)
                res.json({user: nUser, token: req.body.token})
            }else{
                console.log(err)
                res.json(false)
            }
        })
    }
}

module.exports = googleLogin
