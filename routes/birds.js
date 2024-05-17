const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
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