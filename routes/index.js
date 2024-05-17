var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    message: "Hello World"
  })
});

router.get('/sample', function(req, res, next){
  res.send("AA")
});
module.exports = router;
