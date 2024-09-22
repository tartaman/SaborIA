const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const corsOptions = {
  origin: '*',  // O permite solicitudes desde una URL específica si es necesario
  optionsSuccessStatus: 200
};
const app = express();
app.use(cors(corsOptions)); // Para permitir peticiones desde otro origen (en tu caso, el frontend).

const connection = mysql.createConnection({
  host: "82.197.82.74",
  database: "u507122559_saboria",
  user: "u507122559_usersaboria",
  password: process.env.PASSWORD
});
app.use(express.json())
app.get("/dificultades", (req, res) => {
  connection.query("SELECT id_dificultad, nombre FROM dificultad;", (err, result) => {
    if (err) {
      return res.status(500).send("Error en la consulta a la base de datos");
    }
    res.json(result); // Enviamos los resultados como JSON
    console.log(result)
  });
});

app.post("/agregar-receta", (req, res) => {
  const { nombre, tiempo, dificultad, pasos, porciones  } = req.body; // Obtenemos los datos enviados desde el frontend
  if (!nombre || !tiempo || !dificultad || !pasos || !porciones) {
    return res.status(400).json({ message: "El nombre es obligatorio" });
  }
  console.log(`voy a subir ${nombre, tiempo, dificultad, pasos,porciones}`)
  const query = "INSERT INTO receta(titulo, creador, tiempo_preparacion, codigo_imagen, id_dificultad, pasos, porciones, global_recipie, estado) VALUES (?,?,?,?,?,?,?,?,?)";
  connection.query(query, [nombre,1,tiempo,null,dificultad,pasos,porciones,1,1], (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ message: "Error al agregar la receta" });
    }
    res.status(201).json({ message: "receta agregada correctamente", id: result.insertId });
  });
});

// Iniciar el servidor
app.listen(3000, '0.0.0.0',() => {
  console.log("Servidor corriendo en el puerto 3000");
});

//no me maten basicamente querys cada 5 segundos para que el servidor no me saque
setInterval(() => {
  connection.query('SELECT 1');
}, 5000); 