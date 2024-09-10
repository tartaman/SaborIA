DROP DATABASE IF EXISTS Saboria;
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

INSERT INTO medida(nombre, simbolo, estado) VALUES("Gramo", "g", TRUE),
("Kilogramo", "Kg", TRUE),
("Mililitro", "ml", TRUE),
("Litro", "L", TRUE),
("Taza", "Tza", TRUE),
("Onza", "oz", TRUE),
("Piezas", "Pz", TRUE);

INSERT INTO ingrediente(nombre, id_medida, estado) VALUES("Arroz", 1, True), ("Huevo", 7, True), ("Pollo", 1, True), ("Aceite", 3, True), ("Carne", 1, True), ("Sal", 1, True), ("Aceite", 3, True), ("Tomate", 7, True),
("Cebolla", 7, True), ("Cilantro", 1, True), ("Limon", 7, True), ("Naranja agria", 7, True);

INSERT INTO ingrediente(nombre, id_medida, estado) VALUES("Zanahoria", 7, True), ("Elote", 7, True), ("Dientes de ajo", 7, True), ("Aguacate", 7, True), ("Agua", 3, True),
("Chile habanero", 7, True), ("Chile Morron", 7, True), ("Harina", 1, True), ("Lechuga", 7, True), ("Chayote", 7, True), ("Mayonesa", 3, True),
("Guisantes", 1, True), ("Limon", 7, True), ("Atún", 7, True), ("Jamón", 1, True), ("Levadura", 1, True);

UPDATE ingrediente SET id_medida = 1 WHERE Id_ingrediente = 26;

SELECT ingrediente.Id_ingrediente, ingrediente.nombre, medida.simbolo FROM ingrediente INNER JOIN medida ON ingrediente.id_medida = medida.id_medida;