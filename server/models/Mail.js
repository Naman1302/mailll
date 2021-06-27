const mongoose = require('mongoose')

mailSchema = new mongoose.Schema({
    sender: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            required: true
        },
    data: {
        subject: String,
        text: String,
        date: Number,
        scheduleSelector: {
            type: Number,
            default: -1
        }
    },
    recievers: {
        to: [{
            type: String,
            required: true
        }],
        cc: [{
            type: String
        }]
    }
})

module.exports = mongoose.model('mail',mailSchema)
