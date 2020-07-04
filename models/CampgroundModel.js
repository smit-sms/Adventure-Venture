const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

module.exports = mongoose.model('campgroundSchema',campgroundSchema)