const mongoose = require('mongoose');

const commentModel = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "post"
    },
    text : String,
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("comment" , commentModel);