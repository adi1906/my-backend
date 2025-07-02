// server.js

const mysql = require('mysql2');
const express = require('express');
const app = express();

const cors = require('cors');      
app.use(cors());

// 1. MySQL Connection Configuration (REPLACE WITH YOUR ACTUAL CREDENTIALS)
const connection = mysql.createConnection({
  host: 'jotirling.ddns.net',
  user: 'mydatabase',     // <-- IMPORTANT: Replace with your MySQL username
  password: 'mydatabase', // <-- IMPORTANT: Replace with your MySQL password
  database: 'mydatabase',   // <-- IMPORTANT: Replace with your database name
});

// 2. Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err.stack);
    return; // Exit if connection fails
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Hello World! Server is running.');
});

// 3. Define the API route to fetch data from MySQL
app.get('/api/word', (req, res) => {
  // IMPORTANT: Replace 'mytable' and 'mycolumn' with your actual table and column names
  const sql = 'SELECT mycolumn FROM mytable LIMIT 1'; // LIMIT 1 to get just one result as per prev explanation
  
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Error fetching data from database' });
    }

    if (results.length > 0) {
      res.json({ word: results[0].mycolumn });
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
