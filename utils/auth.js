const jwt = require("jsonwebtoken");

function createToken(visibleUser, maxAge = 60 * 60 * 24 * 3) {
  return jwt.sign(visibleUser, process.env.JWT_SECRET || "MyJWT", {
    expiresIn: maxAge,
  });
}

function verifyToken(_token) {
  if (!_token) {
    return null;
  }
  const verifiedToken = jwt.verify(_token, process.env.JWT_SECRET || "MyJWT");
  return verifiedToken;
}


async function authenticate(req, res, next){
  // Cookie에 있는 authToken을 가져오거나,
  let token = req.cookies.authToken;
  // header의 Authorization에 있는 Bearer token을 가져온다.
  let headerToken = req.headers.authorization;
  if (!token && headerToken){
    token = headerToken.split(' ')[1];
  }
  // token = token.length > 0 ? token : null;
  const user = verifyToken(token);
  req.user = user;
  next();
} 

async function loginRequired(req, res, next){
  if(!req.user){
    const error = new Error("login Required.");
    error.status = 403;
    next(error);
  }
  next();
}

module.exports = {
  createToken,
  verifyToken,
  authenticate,
  loginRequired
};
