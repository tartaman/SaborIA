DROP DATABASE if EXISTS Saboria;
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
    estado BOOL DEFAULT TRUE,
    CONSTRAINT FK_medida FOREIGN KEY(id_medida) REFERENCES medida(id_medida),
    CONSTRAINT UQ_NAME_INGREDIENTE UNIQUE(nombre)
);

CREATE TABLE usuario(
	id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    apellido_paterno VARCHAR(100),
    apellido_materno VARCHAR(100),
    correo VARCHAR(100),
    pass Varchar(50),
    estado BOOL DEFAULT TRUE,
    CONSTRAINT UQ_CORREO UNIQUE (correo)
);

CREATE TABLE dificultad(
	id_dificultad INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    estado BOOL DEFAULT TRUE
);

CREATE TABLE receta(
	id_receta INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    creador INT,
    tiempo_preparacion INT,
    codigo_imagen TEXT,
	id_dificultad INT,
    pasos TEXT,
    porciones INT,
    global_recipie bool,
    estado BOOL DEFAULT TRUE,
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
("Piezas", "Pz", TRUE),
("Cucharadita", "Cda",TRUE)
;

INSERT INTO ingrediente(nombre, id_medida, estado) VALUES("Arroz", 1, True), ("Huevo", 7, True), ("Pollo", 1, True), ("Aceite", 3, True), ("Carne", 1, True), ("Sal", 1, True), ("Pimienta", 1, True), ("Tomate", 7, True),
("Cebolla", 7, True), ("Cilantro", 1, True), ("Limón", 7, True), ("Naranja agria", 7, True);

INSERT INTO ingrediente(nombre, id_medida, estado) VALUES("Zanahoria", 7, True), ("Elote", 7, True), ("Dientes de ajo", 7, True), ("Aguacate", 7, True), ("Agua", 3, True),
("Chile habanero", 7, True), ("Chile Morron", 7, True), ("Harina", 1, True), ("Lechuga", 7, True), ("Chayote", 7, True), ("Mayonesa", 3, True),
("Guisantes", 1, True), ("Atún", 1, True), ("Jamón", 1, True), ("Levadura", 1, True);


SELECT ingrediente.Id_ingrediente, ingrediente.nombre, medida.simbolo FROM ingrediente INNER JOIN medida ON ingrediente.id_medida = medida.id_medida;


INSERT INTO usuario(nombre, apellido_paterno, apellido_materno, correo, pass) VALUES("Admin", "", "", "admin@@@", "a");


INSERT INTO dificultad(nombre) VALUES("Principiante"),( "Facil"), ("Intermedio"), ("Dificil"), ("Experto");

INSERT INTO receta (titulo, creador, tiempo_preparacion, codigo_imagen, id_dificultad, pasos, porciones, global_recipie) VALUES
("Huevos revueltos", 1, 5, "", 1, "Rompe los huevos en un bol \nBate bien los huevos con un tenedor o batidor hasta que la mezcla esté homogénea.\nAgrega sal y pimienta al gusto. \nColoca una sartén antiadherente en la estufa a fuego medio. \nAñade el aceite a la sartén y cubra el fondo.
\nVierte la mezcla de huevos en la sartén caliente. \nDeja que los huevos comiencen a cuajar en los bordes, luego usa una espátula de silicona o madera para mover suavemente los huevos hacia el centro, formando pequeños pliegues.
\nContinúa moviendo los huevos suavemente mientras se cocinan. No los remuevas demasiado rápido para evitar que se vuelvan secos.
\nCocina hasta que los huevos estén cocidos pero aún ligeramente húmedos. Los huevos seguirán cocinándose un poco después de sacarlos del fuego.
\nSirve los huevos revueltos calientes, directamente de la sartén a los platos.", 1, TRUE);

INSERT INTO ingrediente_receta(id_ingrediente, id_receta, cantidad) VALUES()

select pasos from receta;