require('dotenv').config();
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const express = require("express");
const nodemailer = require('nodemailer');
const mysql = require("mysql");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const saltRounds = 10 //a más, mas tarda
const correoSaboria = 'appsaboria@gmail.com'
const contraSaboria = 'bamo pqqj szas myuz'
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: `${correoSaboria}`, // Tu email de Hostinger con Outlook
    pass: `${contraSaboria}`, // Tu contraseña
  },
});
const allowedOrigins = process.env.NODE_ENV === 'development'
    ? ['https://saboria.me', 'https://www.saboria.me', 'null']
    : ['https://saboria.me', 'https://www.saboria.me'];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: 'GET,POST'
};

const app = express();
app.use(cors(corsOptions)); // Para permitir peticiones desde otro origen (en tu caso, el frontend).
app.use(helmet.hidePoweredBy());
const connection = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD
});
app.use(express.json())
//Middlewware para verificar que es un usuario válido
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Obtener el token
  if (!token) {
      return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
      // Verificar el token
      const verified = jwt.verify(token, process.env.JWTHASH);
      req.user = verified; // Guardar los datos del usuario en req.user
      next(); // Pasar al siguiente middleware o controlador
  } catch (error) {
      if (error.name === 'TokenExpiredError') {
          // Si el token ha expirado, redirigir o indicar al usuario que inicie sesión de nuevo
          return res.status(401).json({ message: 'Token expirado. Por favor, inicia sesión de nuevo.', token:0 });
      }
      // Otros errores relacionados con el token
      return res.status(400).json({ message: 'Token inválido.' });
  }
};
//Endpoint para verificar el token
app.post('/verify-token', authMiddleware, (req, res) => {
  // Si llega hasta aquí, significa que el token es válido
  res.status(200).json({ valid: true });
});
//aqui se crean las API basicamente todo lo que tenga get, va a hacer una api de la cual podremos descargar datos
app.get("/dificultades", (req, res) => {
  connection.query("SELECT id_dificultad, nombre FROM dificultad;", (err, result) => {
    if (err) {
      return res.status(500).send("Error en la consulta a la base de datos");
    }
    res.json(result); // Enviamos los resultados como JSON
    console.log(result)
  });
});

app.get('/verify-email', (req, res) => {
  const token = req.query.token; // Obtenemos el token desde la URL
  // Primero buscamos el token en la base de datos
  connection.query(
    'SELECT * FROM usuario WHERE token = ?',
    [token],
    (error, results) => {
      if (error) {
        console.error('Error ejecutando la consulta:', error);
        res.send('Error en la base de datos');
        return;
      }

      if (results.length > 0) {
        // Usuario encontrado, actualiza el estado de verificación
        connection.query(
          'UPDATE usuario SET estado = 1 WHERE token = ?',
          [token],
          (err) => {
            if (err) {
              console.error('Error actualizando el usuario:', err);
              res.send('Error al verificar el correo');
              return;
            }
            res.send(`¡Tu correo ha sido verificado exitosamente! Haz click <a href="https://saboria.me/Iniciarsesion.html">aquí</a> para logearte`);
          }
        );
      } else {
        res.send('Token no válido o expirado');
      }
    }
  );
});

app.post("/agregar-receta",authMiddleware, (req, res) => {
  const { nombre, tiempo, dificultad, pasos, porciones} = req.body; // Obtenemos los datos enviados desde el frontend
  if (!nombre || !tiempo || !dificultad || !pasos || !porciones) {
    return res.status(400).json({ message: "El nombre es obligatorio" });
  }
  console.log(`voy a subir ${nombre, tiempo, dificultad, pasos,porciones}`)
  const query = "INSERT INTO receta(titulo, creador, tiempo_preparacion, codigo_imagen, id_dificultad, pasos, porciones, global_recipie, estado) VALUES (?,?,?,?,?,?,?,?,?)";
  connection.query(query, [nombre,req.user.userId,tiempo,null,dificultad,pasos,porciones,1,1], (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ message: "Error al agregar la receta" });
    }
    res.status(201).json({ message: "receta agregada correctamente", id: result.insertId });
  });
});

app.post("/addEmail", (req,res) => {
  let uploadedToDatabase = false;
  const {nombre, apat, amat,correo,username,pass} = req.body
  if (!nombre || !apat || !correo || !username || !pass) 
    return res.status(400).json({message: "Campo o Campos obligatorios no llenados"});
  console.log(`voy a subir ${nombre, apat, amat, correo, username,pass}`)
  const token = crypto.randomBytes(32).toString('hex');
  // Hasheamos la contraseña
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) throw err;

    bcrypt.hash(pass, salt, (err, hash) => {
      if (err) throw err;
      
      const query = "INSERT INTO usuario (nombre, apellido_paterno, apellido_materno, correo, pass, estado, token, username) VALUES(?, ?, ?, ?, ?, ?, ?, ?);"
      connection.query(query, [nombre, apat,amat, correo,hash,0,token, username], (err,result) => {
        if (err) {
          console.log(err)
          return res.status(500).json({message:"Error al registrar usuario"});
        }
        uploadedToDatabase = true;

        res.status(201).json({message: "Registrado correctamente", id: result.insertId});
      })
      uploadedToDatabase = true;
      if (uploadedToDatabase) {
        const mailOptions = {
          from: `${correoSaboria}`,
          to: `${correo}`,
          subject: 'Verifica tu cuenta en SaborIA',
          text: `Por favor verifica tu correo entrando a este enlace: ${process.env.APIHOST}/verify-email?token=${token}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error al enviar el correo:', error);
          } else {
            console.log('Correo enviado: ' + info.response);
          }
        });
      }
    }
  )});
});
app.post("/login", (req, res) => {
  const { username, pass } = req.body;
  
  connection.query("SELECT * FROM usuario WHERE username = ?", [username], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    if (result.length === 0) {
      // Si el usuario no existe
      return res.status(401).json({ message: "Usuario no encontrado" });
    }
    if (result) {
      //Si devuelve algo, imprimelo
      console.log(result)
    }
    if (result[0].estado == 0) {
      return res.status(401).json({message: "Por favor, verifica tu correo antes de acceder"})
    }
    const storedHash = result[0].pass;
    bcrypt.compare(pass, storedHash, function(err, isMatch) {
      if (err) throw err;

      if (isMatch) { // Si la contraseña es correcta
        const token = jwt.sign({ userId: result[0].id_usuario, email: result[0].correo }, process.env.JWTHASH, { expiresIn: '10h' });
        return res.status(200).json({ token, user: { userid: result[0].id_usuario, email: result[0].correo } });
      } else { // Si la contraseña es incorrecta
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
    });
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