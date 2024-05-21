var express = require('express');
var router = express.Router();
const User = require('../models/User');
const {createToken, verifyToken} = require('../utils/auth');



router.post('/signup', async (req, res, next)=>{
  try {
    const { email, password } = req.body;
    const user = await User.signUp(email, password);
    res.status(201).json(user);
  } catch(err){
    res.status(400);
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const tokenMaxAge = 60 * 60 * 24 * 3;
    const token = createToken(user, tokenMaxAge);

    user.token = token;

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: tokenMaxAge * 1000,
    });

    console.log(user);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400);
    next(err);
  }
});

router.all("/logout", async (req, res, next) => {
  // cookie 삭제
  try {
    res.cookie("authToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(204).send();

  } catch (err) {
    console.error(err);
    res.status(400);
    next(err);
  }
});


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.get('/:userId', function(req, res, next){
//   res.send(req.params.userId)
// })

module.exports = router;
