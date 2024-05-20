const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    console.log("현재 Cookie", req.cookies);

    res.cookie('cookieName', "my-cookie-value",{
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false,
        signed: false
    });

    res.cookie('httpOnlyFalse', "httpOnlyFalseVallue",{
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false,
        secure: false,
        signed: false
    });

    res.send('Birds home page');
})

router.get('/about', (req, res)=>{
    res.send("About birds");
})

// router.post
// router.put
// router.delete
// router.all

module.exports = router;