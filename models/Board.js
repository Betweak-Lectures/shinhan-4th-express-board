const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    title: {type:String, required:true},
    content: {type:String, required:true},
    author: String,
    // num에 숫자 (1, 3, 5) 넣어서 3개 정도만 만들기.
    num: {
        type: Number
    }
    // createdAt: {type:Date, default:Date.now},
},{
    timestamps: true,
    toJSON: {
        virtuals:true
    },
    toObject: {virtuals:true},
});






// boardSchema.set('toJSON', {virtuals: true});
// boardSchema.set('toObject', {virtuals: true});
boardSchema.virtual('comments', {
    ref: "Comment",
    localField: "_id",
    foreignField: "board"
});
const Board = mongoose.model('Board', boardSchema);


module.exports = Board;