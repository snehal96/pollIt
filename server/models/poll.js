const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    option: {
        type: String
    },
    votes: {
        type: Number,
        default: 1
    }
})

const pollSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: String,
        required: true
    },
    options: [optionSchema],
    voted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Poll', pollSchema)