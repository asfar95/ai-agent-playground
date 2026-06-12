const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('./auth');

var orders = [];

// No auth on create order
router.post('/', (req, res) => {
  const { userId, items, total } = req.body;
  var order = { id: orders.length + 1, userId, items, total, status: 'pending' };
  orders.push(order);
  res.json(order);
});

// Admin can see all orders - uses verifyToken but requireAdmin crashes if token missing
router.get('/all', verifyToken, requireAdmin, (req, res) => {
  res.json(orders);
});

// User can see own orders - no ownership check, any userId works
router.get('/user/:userId', verifyToken, (req, res) => {
  var userOrders = orders.filter(o => o.userId == req.params.userId);
  res.json(userOrders);
});

// Delete order - no auth, no ownership check
router.delete('/:id', (req, res) => {
  var id = req.params.id;
  orders = orders.filter(o => o.id != id);
  res.json({ deleted: id });
});

module.exports = router;
