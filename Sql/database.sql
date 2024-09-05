Create DATABASE Saboria;
USE Saboria;

CREATE TABLE medida(
	id_medida INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    simbolo VARCHAR(15),
    estado BOOL
);

CREATE TABLE ingrediente(
	id_ingrediente INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    nombre VARCHAR(100),
    id_medida INT,
    codigo_imagen TEXT,
    estado BOOL,
    CONSTRAINT FK_medida FOREIGN KEY(id_medida) REFERENCES medida(id_medida)
);

CREATE TABLE usuario(
	id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    apellido_paterno VARCHAR(100),
    apellido_materno VARCHAR(100),
    correo VARCHAR(100),
    pass Varchar(50),
    estado BOOL
);

CREATE TABLE dificultad(
	id_dificultad INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    estado BOOL
);

CREATE TABLE receta(
	id_receta INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    creador INT,
    tiempo_preparacion INT,
    codigo_imagen TEXT,
	id_dificultad INT,
    pasos TEXT,
    global_recipie bool,
    estado BOOL,
    CONSTRAINT FK_creador FOREIGN KEY(creador) REFERENCES usuario(id_usuario),
    CONSTRAINT FK_dificultad FOREIGN KEY(id_dificultad) REFERENCES dificultad(id_dificultad)
);

CREATE TABLE ingrediente_receta(
	id_ingrediente INT NOT NULL,
    id_receta INT NOT NULL,
    cantidad FLOAT,
    PRIMARY KEY(id_ingrediente,  id_receta),
    CONSTRAINT FK_ingrediente_receta FOREIGN KEY(id_ingrediente) REFERENCES ingrediente(id_ingrediente),
    CONSTRAINT FK_receta_ingrediente FOREIGN KEY(id_receta) REFERENCES receta(id_receta)
);

CREATE TABLE inventario(
	id_ingrediente INT NOT NULL,
    id_usuario INT NOT NULL,
    cantidad FLOAT,
    PRIMARY KEY(id_ingrediente,  id_usuario),
    CONSTRAINT FK_ingrediente_usuario FOREIGN KEY(id_ingrediente) REFERENCES ingrediente(id_ingrediente),
    CONSTRAINT FK_usuario_ingrediente FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario)
);


