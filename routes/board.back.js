const express = require('express');
const router = express.Router();

const Comment = require('../models/Comment');
const Board = require('../models/Board');

router.get('/', (req, res)=>{
    // Board에서 num이 3인 데이터 조회
    // Board.find({num:3}).then(result=>{
    //     res.json(result);
    // })

    // Board에서 num이 2보다 큰 (greater than) 데이터 조회
    // Board.find(
    //     {
    //         num: {
    //             $gt: 2
    //         }
    //     }
    // ).then(result=>{
    //     res.json(result);
    // })

    // Board에서 num이 1보다 크거나 같은(greater than equal) 데이터 조회 
    // Board.find(
    //     {
    //         num: {
    //             $gte: 1
    //         }
    //     }
    // ).then(result=>{
    //     res.json(result);
    // })

    // Board에서 num이 5보다 작은 (less than: lt) 데이터 조회 
    // Board.find({
    //     num: {
    //         $lte: 5
    //     }
    // }).then(result=>{
    //     res.json(result);
    // })

    // Board에서 num이 5보다 작거나 같은 (less than equal: lte) 데이터 조회


    // Comment.create({
    //     // content: "댓글1",
    //     content: "댓글1 다섯글자 이상.",
    //     author:"작성자1",
    // }).then(result=>{
    //     res.json(result);
    // }).catch(err=>{
    //     console.error(err);
    //     res.json(err);
    // })

    // Comment.create({
    //     // content: "댓글1",
    //     content: "댓글2 다섯글자 이상.",
    //     author:"작성자2",
    //     tags: ["Love", "Science"]
    // }).then(result=>{
    //     res.json(result);
    // }).catch(err=>{
    //     console.error(err);
    //     res.json(err);
    // })

    // const board = new Board(
    //     {
    //         title: "제목1",
    //         content: "내용1",
    //         author: "작성자1"
    //     }
    // )
    // board.save().then(result=>{
    //     console.log(result);
    //     res.json(result);
    // })
    // Board.insertMany([
    //     {
    //         title: "제목3",
    //         content: "내용3",
    //         author: "작성자1"
    //     },{
    //         title: "제목4",
    //         content: "내용4",
    //         author: "작성자1"
    //     }
    // ]).then(data=>{
    //     res.json(data);
    // }).catch(err=>{
    //     console.error(err);
    // });

    // 데이터 조회
    // Board.find().then(data=>{
    //     res.json(data);
    // });

    // 데이터 1개 조회
    // Board.findOne().then(data=>{
    //     res.json(data);
    // });

    // Board.find({author: "작성자1"}).then(data=>{
    //     res.json(data);
    // });

    // Board.findById('6646a11a8a1518c53dd8f3c4').then(data=>{
    //     res.json(data);
    // });

    // 데이터 1개 삭제
    // Board.deleteOne({title:"제목4"}).then(result=>{
    //     res.json(result);
    // });
    
    // 데이터 삭제.
    // Board.deleteMany({author: '작성자1'}).then(result=>{
    //     res.json(result);
    // })

    // Board.updateOne({title: "제목2"}, {content: "내용2 수정"}).then(
    //     result=>{
    //         res.json(result);
    //     }
    // )
    
    // Board.create({
    //     title: "제목5",
    //     content: "내용5",
    //     author: "작성자3"
    // }).then(result=>{
    //     res.json(result);
    // })
    
    // res.send("My First Board");


    // Comment 추가시 board의 _id직접 전달.
    // Comment.create({
    //     content: "new Comment",
    //     author: "ys",
    //     board: "66469d319b84ad773be893a8"
    // }).then(result=>{
    //     res.json(result);
    // });

    // Board 객체 전달. Ref
    // Board.findOne().then(board=>{
    //     Comment.create({
    //         content: "새 댓글입니다.",
    //         author: "sys",
    //         board: board
    //     }).then(result=>{
    //         res.json(result);
    //     })
    // })
    
    // comment populated board
    // Comment.find().populate('board').then(result=>{
    //     res.json(result);
    // });

    // board populated comments
    Board.find().populate('comments').then(result=>{
        res.json(result);
        
    });
});

module.exports = router;