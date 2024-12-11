// app/Services/server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 5000;  // Set your desired port

// Serve the Product.json file
app.get('/Product.json', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'components', 'Product.json'));  // Navigate to 'app/components/Product.json'
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

