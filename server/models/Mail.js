const mongoose = require('mongoose')

mailSchema = new mongoose.Schema({
    sender: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
    data: {
        subject: String,
        text: String,
        date: Number,
        scheduleSelector: Number
    },
    recievers: {
        to: [{
            type: String
        }],
        cc: [{
            type: String
        }]
    }
})

module.exports = mongoose.model('mail',mailSchema)