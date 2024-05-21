const express = require('express');
const router = express.Router();

const {loginRequired} = require('../utils/auth');
router.get('/protected', loginRequired, (req, res)=>{
    // 로그인 된 유저만 접근 가능.
    res.send("Protected Resource!");
})

router.get('/', (req, res)=>{
    console.log(req.user);
    // console.log("현재 Cookie", req.cookies);    

    // res.cookie('cookieName', "my-cookie-value",{
    //     maxAge: 1000 * 60 * 60 * 24,
    //     httpOnly: true,
    //     secure: false,
    //     signed: false
    // });

    // res.cookie('httpOnlyFalse', "httpOnlyFalseVallue",{
    //     maxAge: 1000 * 60 * 60 * 24,
    //     httpOnly: false,
    //     secure: false,
    //     signed: false
    // });

    if (req.session.viewCount){
        req.session.viewCount++;
    } else{
        req.session.viewCount = 1;
    }
    
    console.log(req.session);

    res.send(`Birds home page! 방문: ${req.session.viewCount}`);
})

router.get('/about', (req, res)=>{
    res.send("About birds");
})

// router.post
// router.put
// router.delete
// router.all

module.exports = router;