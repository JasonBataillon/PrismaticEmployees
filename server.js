const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/', require('./api/employees.js'));

// 404
app.use((req, res, next) => {
  next({ status: 404, message: 'Endpoint not found.' });
});

// Error-handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? 'Sorry, something went wrong :(');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
