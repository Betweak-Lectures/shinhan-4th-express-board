const express = require('express');
const router = express.Router();

const Comment = require('../../models/Comment');
const Board = require('../../models/Board');

// (/board) GET: 전체 게시글 조회
router.get('/', (req, res)=>{
    console.log(req.session.boardPath);
    Board.find().then(result=>{
        res.json(result);
    });
});

function trackBoard(sess, boardTitle){
    if (!sess.boardPath){
        sess.boardPath = [];
    }
    if (sess.boardPath.length===10){
        sess.boardPath.shift();
    } 
    sess.boardPath.push(boardTitle);
}

// (/board/:boardId) GET: <:boardId>에 해당하는 게시글 조회
router.get('/:boardId', (req, res)=>{
    // url에서 <:boardId> 부분을 req.params라는 객체의 boardId키로 조회
    Board.findById(req.params.boardId)
        .populate('comments').then(result=>{
            if (!result){
                res.status(404).send();
            }
            trackBoard(req.session, result.title)
            res.json(result);
    });

});

// (/board/) POST: 게시글 등록
router.post('/', (req, res)=>{
    // console.log(req.headers);
    // console.log(req.body);
    const {title, content, author} = req.body
    Board.create({
        title: title,
        content: content,
        author: author
    }).then(result=>{
        res.status(201).json(result);
    })
});

// put요청: (/:boardId) => <:boardId>에 해당하는 게시글 수정
router.put('/:boardId', (req, res)=>{
    const {title, content} = req.body;
    Board.findByIdAndUpdate(req.params.boardId,{
        title: title,
        content: content
    }).then(result=>{
        res.json(result);
    });
})

// delete요청: (/:boardId) => <:boardId>에 해당하는 게시글 삭제
router.delete('/:boardId', (req, res)=>{
    const boardId = req.params.boardId;
    Board.findByIdAndDelete(boardId).then(result=>{
        res.status(204).send();
    });
})

router.post('/:boardId/comments', (req, res)=>{
    const boardId = req.params.boardId;
    const {content, author} = req.body;
    Comment.create({
        content: content,
        author: author,
        board: boardId
    }).then(result=>{
        res.json(result);
    })
});

router.put("/:boardId/comments/:commentId", (req, res)=>{
    const {boardId, commentId} = req.params;
    const {content, author} = req.body;
    Comment.findOneAndUpdate({
        board: boardId,
        _id: commentId
    }, {
        content: content,
        author: author
    }).then(result=>{
        res.json(result);
    })
});

router.delete('/:boardId/comments/:commentId', (req, res)=>{
    const {boardId, commentId}= req.params;
    Comment.findOneAndDelete({
        board: boardId,
        _id: commentId
    }).then(result=>{
        res.status(204).send();
    })
})



module.exports = router;