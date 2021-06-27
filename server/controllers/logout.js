function logout(req,res){
    res.cookie('ACCESS_TOKEN','',{
        maxAge: 1
    })
    res.redirect('/login')
}

module.exports = logout
