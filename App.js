const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(express.static(__dirname));

const app = express();
const port = 3000;

// Conexion a la base de daots
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'alumno',
  password: 'alumnoipm',
  database: 'nodeJs'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos ', err);
  } else {
    console.log('Se ha conectado exitosamente');
  }
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/formulario', (req, res) => {
  res.sendFile(__dirname + '/formulario.html');
});

// Insertar en la base de datos
app.post('/insertar', (req, res) => {
  const { nombre, mail } = req.body;
  const insertQuery = 'INSERT INTO users (name, email) VALUES (?, ?)';
  connection.query(insertQuery, [nombre, mail], (err, result) => {
    if (err) {
      console.error('Error al insertar datos: ', err);
      res.send('Error al insertar datos en la base de datos ');
    } else {
      res.send('Datos insertados correctamente ');
    }
  });
});


app.listen(port, () => {
  console.log(`La aplicación está funcionando en http://localhost:${port}`);
});
