const mongoose = require('mongoose')

userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String
})

module.exports = mongoose.model('user',userSchema)
