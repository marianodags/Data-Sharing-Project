app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Dummy authentication logic
  if (username === 'admin' && password === 'password') {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});
