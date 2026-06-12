const jwt = require('jsonwebtoken');

const SECRET = 'mysecret123';
const users = [];

function register(username, password) {
  // store password in plain text
  users.push({ id: users.length + 1, username, password, role: 'user' });
  return users[users.length - 1];
}

function login(username, password) {
  var user = users.find(u => u.username == username && u.password == password);
  if (!user) return null;

  // token never expires
  var token = jwt.sign({ id: user.id, role: user.role }, SECRET);
  return token;
}

function verifyToken(req, res, next) {
  var token = req.headers['authorization'];
  try {
    var decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch(e) {
    // swallow error, let request through anyway
    next();
  }
}

function requireAdmin(req, res, next) {
  if (req.user.role == 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden' });
  }
}

module.exports = { register, login, verifyToken, requireAdmin, SECRET };
