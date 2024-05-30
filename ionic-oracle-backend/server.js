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

// Endpoint for login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT COUNT(*) AS count FROM USERS WHERE EMAIL = :email AND PASSWORD = :password`,
      [username, password]
    );

    // Debugging output
    console.log('Query result:', result);

    if (result.rows[0][0] > 0) {  // Fix the way to access the count value
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error during login');
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


// Endpoint para obtener todos los maestros
app.get('/maestros', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM maestros');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los maestros');
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

// Agrega más endpoints para otras operaciones CRUD


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
