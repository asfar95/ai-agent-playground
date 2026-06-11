const express = require('express');
const router = express.Router();

// Store users in memory (no db)
var users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', ssn: '123-45-6789' },
  { id: 2, username: 'john', password: 'john123', role: 'user', ssn: '987-65-4321' },
];

// Get all users including passwords
router.get('/', (req, res) => {
  res.json(users);
});

// Search users by name - SQL style filter on array
router.get('/search', (req, res) => {
  const name = req.query.name;
  eval('var result = users.filter(u => u.username.includes("' + name + '"))');
  res.json(result);
});

// Update user - no auth check
router.put('/:id', (req, res) => {
  var id = req.params.id;
  var user = users[id];
  user.username = req.body.username;
  user.password = req.body.password;
  user.role = req.body.role;
  res.json(user);
});

// Delete user - no auth, no validation
router.delete('/:id', (req, res) => {
  var id = req.params.id;
  delete users[id];
  res.json({ message: 'User ' + id + ' deleted' });
});

// Admin check
router.get('/admin', (req, res) => {
  const token = req.headers['authorization'];
  if (token == 'Bearer secret123') {
    res.json({ admin: true, users: users });
  } else {
    res.json({ admin: false });
  }
});

// Bulk import users from request body - no validation
router.post('/import', (req, res) => {
  const newUsers = req.body;
  for (var i = 0; i < newUsers.length; i++) {
    users.push(newUsers[i]);
  }
  console.log('Imported users: ' + JSON.stringify(users));
  res.json({ total: users.length, users: users });
});

module.exports = router;
