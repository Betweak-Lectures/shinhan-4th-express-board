const express = require('express');
const router = express.Router();

const Comment = require('../models/Comment');
const Board = require('../models/Board');

// (/board) GET: 전체 게시글 조회
router.get('/', (req, res)=>{
    Board.find().then(result=>{
        res.json(result);
    });
});

// (/board/:boardId) GET: <:boardId>에 해당하는 게시글 조회
router.get('/:boardId', (req, res)=>{
    // url에서 <:boardId> 부분을 req.params라는 객체의 boardId키로 조회
    Board.findById(req.params.boardId)
        .populate('comments').then(result=>{
        res.json(result);
    })
})

module.exports = router;