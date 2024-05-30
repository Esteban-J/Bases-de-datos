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
app.get('/teachers', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM TEACHER');
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


// Endpoint para obtener todas las evaluaciones
app.get('/evaluations', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM EVALUATIONS');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching evaluations from Oracle database');
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

//crear evaluacion
app.put('/evaluations/:id', async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `UPDATE EVALUATIONS SET field1 = :field1, field2 = :field2, ... WHERE id_evaluation = :id`,
      { ...newData, id: id }
    );
    res.status(200).send('Evaluation updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating evaluation');
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

//eliminar evaluacion
app.delete('/evaluations/:id', async (req, res) => {
  const id = req.params.id;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `DELETE FROM EVALUATIONS WHERE id_evaluation = :id`,
      [id]
    );
    res.status(200).send('Evaluation deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting evaluation');
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

//crear evaluacion
app.post('/evaluations', async (req, res) => {
  const newData = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `INSERT INTO EVALUATIONS (field1, field2, ...) VALUES (:field1, :field2, ...)`,
      { ...newData }
    );
    res.status(201).send('Evaluation created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating evaluation');
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
