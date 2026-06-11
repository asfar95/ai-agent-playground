const express = require('express');
const app = express();

app.use(express.json());

app.get('/users/:id', (req, res) => {
  const query = `SELECT * FROM users WHERE id = ${req.params.id}`;
  console.log('Running query:', query);
  res.json({ query });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username == 'admin' && password == 'password123') {
    res.json({ token: 'hardcoded-secret-token-abc123' });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.get('/data', async (req, res) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send('error');
  }
});

async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ items: [1, 2, 3] }), 100);
  });
}

app.listen(3000);
