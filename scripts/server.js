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
const helmet = require("helmet");
const multer = require('multer');
const fs = require('fs');
const path = require('path');

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
app.use(helmet());
app.use(cors(corsOptions)); // Para permitir peticiones desde otro origen (en tu caso, el frontend).
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
//Relacionado a Imágenes---------------------------------------------------------------------------

// Configura multer para subir archivos a una carpeta 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);  // Carpeta donde se guardan las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}`); // Renombrar el archivo para evitar duplicados
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Ruta para subir imágenes
app.post('/upload', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se subió ninguna imagen' });
  }

  const userId = req.user.userId;
  const recetaNombre = req.body.recetaNombre; // Obtenemos el nombre de la receta del body
  const extension = path.extname(req.file.originalname);
  const newFileName = `${userId}_${recetaNombre}${extension}`;
  const newFilePath = path.join(__dirname, 'uploads', newFileName);

  // Mover el archivo al nuevo nombre
  fs.rename(req.file.path, newFilePath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al renombrar la imagen' });
    }

    // Guardar el nombre de la imagen en la base de datos (opcional)
    const query = "UPDATE receta SET codigo_imagen = ? WHERE id_receta = ?";
    connection.query(query, [newFileName, req.body.recetaId], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al guardar el nombre de la imagen en la base de datos' });
      }

      res.status(200).json({ message: 'Imagen subida correctamente', imageUrl: `/uploads/${newFileName}` });
    });
  });
});
// Servir las imágenes que se han subido
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Relacionado a verificacion o pulls a la db ------------------------------------------------------------------
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

app.get('/ingredientes', (req, res) => {
  connection.query("SELECT * FROM ingrediente", (err,result) => {
    if (err) {
      return res.status(500).send('Error en la consulta de la base de datos');
    }
    res.json(result);
    console.log(result);
  })
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
app.post('/agregar-receta', authMiddleware, (req, res) => {
  const { nombre, tiempo, dificultad, pasos, porciones } = req.body;
  if (!nombre || !tiempo || !dificultad || !pasos || !porciones) {
    console.log(req.body)
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }
  const userId = req.user.userId;
  console.log(`voy a subir ${nombre} ${tiempo} ${dificultad} ${pasos} ${porciones} ${userId}`);
  
  const query_limite = "SELECT COUNT(id_receta) as num_recetas, u.premium_recetas FROM receta r INNER JOIN usuario u ON u.id_usuario = r.creador WHERE creador = ? GROUP BY r.creador";
  connection.query(query_limite, [userId], (err, result) => {
    if (err) throw err;
    
    let can_create_recipe = false;
    let isPremium = false;
    let msj = "";

    if (result.length === 0) {
      can_create_recipe = true; // El usuario no tiene recetas, puede crear una
      msj = "No ha creado ninguna receta, puede crear la receta.";
    } else {
      if (result[0].premium_recetas == 1) {
        isPremium = true;
      }

      if (result[0].num_recetas < 10) {
        can_create_recipe = true;
        msj = "Ha creado menos de 10 recetas, puede crear la receta.";
      } else if (isPremium) {
        can_create_recipe = true;
        msj = "Es premium, por lo que puede agregar más recetas.";
      } else {
        can_create_recipe = false;
        msj = "Ha alcanzado el límite de recetas permitidas.";
      }
    }

    if (can_create_recipe) {
      const query = "INSERT INTO receta (titulo, tiempo_preparacion, id_dificultad, pasos, porciones, creador, global_recipie) VALUES (?, ?, ?, ?, ?, ?, ?)";
      connection.query(query, [nombre, tiempo, dificultad, pasos, porciones, userId, 0], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error al agregar la receta: ' + err });
        }
        res.status(201).json({ message: 'Receta agregada correctamente', recetaId: result.insertId });
      });
    } else {
      res.status(403).json({ message: "Error: " + msj });
    }
  });
});

//Relacionado a verificacion o pulls a la db ------------------------------------------------------------------
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

app.post("/addEmail", (req,res) => {
  let uploadedToDatabase = false;
  const {nombre, apat, amat,correo,username,pass} = req.body
  if (!nombre || !apat || !correo || !username || !pass) 
    return res.status(400).json({message: "Campo o Campos obligatorios no llenados"});
  console.log(`voy a subir ${(nombre, apat, amat, correo, username,pass)}`)
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