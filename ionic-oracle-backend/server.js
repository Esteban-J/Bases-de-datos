// server.js
const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
const dbConfig = require('./dbConfig');
const cors = require('cors');    

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to fetch data
app.get('/data', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM subject');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data from Oracle database');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
