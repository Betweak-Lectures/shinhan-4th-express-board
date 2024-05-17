const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    content: {
        type: String, 
        required: true,
        validate: (value) => value.length >= 5
    }, 
    author: {
        type: String, 
        required: true,
    },
    board:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Board"
    },
    tags: {
        type: [String],
    }
}, {
    timestamps: true,
    toJSON: {virtuals:true},
    toObject:{virtuals:true}
});


module.exports = mongoose.model('Comment', commentSchema);