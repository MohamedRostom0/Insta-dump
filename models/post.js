const mongoose = require('mongoose')
const { POST_CATEGORY_TYPES } = require('./post_constants')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: POST_CATEGORY_TYPES,
    },
    url: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema)