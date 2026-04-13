const express = require('express');
const guardianPlugin = require('./guardian-plugin');

const app = express();
const PORT = 4000; // Running on a different port than Next.js

app.get('/api/orders', (req, res) => {
  res.json({ message: "Orders fetched" });
});

// SIMULATED CRASH ROUTE
app.get('/api/checkout', (req, res) => {
  // Simulate a random DB crash
  throw new Error("PostgreSQL connection pool limit reached");
});

// THE PLUG-IN: This must be the LAST middleware
app.use(guardianPlugin('checkout-service'));

app.listen(PORT, () => {
  console.log(`🚀 Target API running at http://localhost:4000`);
});