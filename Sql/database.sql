DROP DATABASE IF EXISTS saboria;
Create DATABASE saboria;
USE saboria;

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
    pass Varchar(255),
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
ALTER TABLE usuario 
ADD COLUMN token varchar(255) DEFAULT "";
ALTER TABLE usuario
ADD COLUMN username varchar(255) DEFAULT "";
ALTER TABLE usuario 
ADD COLUMN premium_recetas BOOL DEFAULT false;
ALTER TABLE receta
ADD CONSTRAINT UNIQUE(titulo);

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

INSERT INTO ingrediente(nombre, id_medida, estado) VALUES ("Chile guajillo", 7, True);
INSERT INTO ingrediente(nombre, id_medida, estado) VALUES ("Epazote", 7, True);
INSERT INTO ingrediente(nombre, id_medida, estado) VALUES ("Tortilla", 7, True), ("Totopos", 7,TRUE);
INSERT INTO ingrediente(nombre, id_medida, estado) VALUES ("Crema ácida",3, True), ("Queso fresco",1, True);
INSERT INTO ingrediente(nombre, id_medida, estado) VALUES ("Queso oaxaca", 1, True), ("Aceite de Oliva", 3, True);
INSERT INTO ingrediente(nombre, id_medida, estado) VALUES ("Frijol refrito", 1, True), ("Chile morita", 7, True), ("Queso cotija", 1, True),
("Media crema", 3, True);
INSERT INTO ingrediente(nombre, id_medida, estado) VALUES ("Carne de res molida", 1, True), ("Pimentón", 7, True), ("Paprika", 1, True), ("Pasta de tomate", 3, True),
("Azúcar", 1, True);
INSERT INTO ingrediente(nombre, id_medida, estado) VALUES ("Pechuga de pollo", 1, True), ("Repollo", 1, True);
INSERT INTO ingrediente(nombre, id_medida, estado) VALUES ("Calabaza", 1, True), ("Calabacita", 1, True);
INSERT INTO ingrediente(nombre, id_medida, estado) VALUES ("Paquetes de pasta spagetti", 7, True);
INSERT INTO ingrediente(nombre, id_medida, estado) VALUES ("Barra de mantequilla", 7, True);
INSERT INTO ingrediente(nombre, id_medida, estado) VALUES ("Queso manchego", 1, True);

SELECT ingrediente.Id_ingrediente, ingrediente.nombre, medida.simbolo FROM ingrediente INNER JOIN medida ON ingrediente.id_medida = medida.id_medida;


INSERT INTO usuario(nombre, apellido_paterno, apellido_materno, correo, pass) VALUES("Admin", "", "", "admin@@@", "a");


INSERT INTO dificultad(nombre) VALUES("Principiante"),( "Facil"), ("Intermedio"), ("Dificil"), ("Experto");

INSERT INTO receta (titulo, creador, tiempo_preparacion, codigo_imagen, id_dificultad, pasos, porciones, global_recipie) VALUES
("Huevos revueltos", 1, 5, "", 1, "Rompe los huevos en un bol \nBate bien los huevos con un tenedor o batidor hasta que la mezcla esté homogénea.\nAgrega sal y pimienta al gusto. \nColoca una sartén antiadherente en la estufa a fuego medio. \nAñade el aceite a la sartén y cubra el fondo.
\nVierte la mezcla de huevos en la sartén caliente. \nDeja que los huevos comiencen a cuajar en los bordes, luego usa una espátula de silicona o madera para mover suavemente los huevos hacia el centro, formando pequeños pliegues.
\nContinúa moviendo los huevos suavemente mientras se cocinan. No los remuevas demasiado rápido para evitar que se vuelvan secos.
\nCocina hasta que los huevos estén cocidos pero aún ligeramente húmedos. Los huevos seguirán cocinándose un poco después de sacarlos del fuego.
\nSirve los huevos revueltos calientes, directamente de la sartén a los platos.", 1, TRUE);

INSERT INTO ingrediente_receta(id_ingrediente, id_receta, cantidad) VALUES(2, 1, 2), (6, 1, 1.5), (7, 1, 0.3), (4, 1, 15);


INSERT INTO receta (titulo, creador, tiempo_preparacion, codigo_imagen, id_dificultad, pasos, porciones, global_recipie) VALUES
("Chilaquiles rojos", 1, 40, "", 2, "Hierve los tomates ya pelados en agua durante 3 minutos. \nAñade los chiles guajillo limpios y sin semilla y déjalos hervir por 2 minutos más. \nRetira del fuego los ingredientes y déjalos reposar hasta que se enfríen.
\nLicúa los jitomates y los chiles con el agua donde hirvieron, junto con los ajos y 1/4 de cebolla hasta obtener una salsa tersa.
\nCuélala y resérvela. Pon sobre el fuego una cacerola con 15 ml de aceite; cuando esté caliente, añade la salsa, las ramas de epazote y la sal.
\nDistribuye en platos los totopos y báñalos con la salsa caliente.
\n Agrégales crema, queso y cebolla.", 4, TRUE);

INSERT INTO ingrediente_receta(id_ingrediente, id_receta, cantidad) VALUES(8, 2, 3), (28, 2, 6), (15, 2, 2), (9, 2, 0.75),
(4, 2, 165), (29, 2, 2), (6, 2, 5), (31, 2, 80), (32,2, 200), (33,2, 250);

INSERT INTO receta (titulo, creador, tiempo_preparacion, codigo_imagen, id_dificultad, pasos, porciones, global_recipie) VALUES
("Omelette de jamón y queso", 1, 15, "", 2, "A la hora de preparar tu tortilla francesa u omelette con jamón y queso, lo primero que 
deberás hacer será cascar y batir los huevos en un cuenco o plato hondo. Agregar la sal durante este proceso, puede ser al gusto. 
Cabe destacar que hay quienes le agregan un poco de leche (dos cucharadas) para conseguir un omelet más esponjoso.
\nA continuación, deberás cortar el jamón en pequeñas tiras o trozos que deberás incorporar al cuenco con los huevos batidos. 
En el caso del queso, rayarlo o trozearlo y agregarlo también a la mezcla.
\n Con la ayuda de un tenedor, remueve bien la mezcla para que el jamón y el queso queden bien integrados en el huevo y 
mientras pon al fuego una sartén antiadherente con un poco de aceite de oliva. Será fundamental que la sartén no se pegue para
no destrozar la tortilla francesa mientras la preparas.
\nUna vez que la sartén con aceite esté bien caliente, deberás verter la mezcla de tu omelette de jamón y queso y menéala un poco con una cuchara de madera -nunca con utensilios metálicos para evitar rayar la sartén- para que el huevo cuaje.
\nUna vez que veamos que empieza a cocinarse por una cara, tendremos que dar la vuelta a la tortilla francesa de jamón y queso para que
quede dorada por ambos lados. Asimismo, puedes optar entre doblar tu omelette por la mitad, en tres partes o mantener la forma redondeada 
de la sartén.", 1, TRUE);

INSERT INTO ingrediente_receta(id_ingrediente, id_receta, cantidad) VALUES(2, 3, 2), (6, 3, 1.5), (26, 3, 50), (4, 3, 15); 

INSERT INTO receta (titulo, creador, tiempo_preparacion, codigo_imagen, id_dificultad, pasos, porciones, global_recipie) VALUES
("Enfrijoladas de polo", 1, 45, "", 2, "Hervir el pollo y luego deshebrarlo\nPicar la cebolla y freirla junto con el ajo ya pelado, hasta que la cebolla se vea transparente.
 Agregar los frijoles y el chile morita. (cocinar a fuego medio por 10 minutos)\nLicuar la salsa hasta integrar los ingredientes. 
 Conservar caliente.\nPasar las tortillas por aceite hirviendo.\nTomar las tortillas y rellenarlas de pollo.\n
 Acomodar las 4 tortillas rellenas sobre un plato.\nServir la salsa de frijoles, agregar crema, pollo y queso al gusto.", 1, TRUE);
 
 INSERT INTO ingrediente_receta(id_ingrediente, id_receta, cantidad) VALUES(3, 4, 300), (36, 4, 240), (15, 4, 2), (9, 4, 0.25), (37, 4, 3),
 (39, 4, 150), (38, 4, 20), (30, 4, 4), (6, 4, 2), (7, 4, 1), (10, 4, 2);

INSERT INTO receta (titulo, creador, tiempo_preparacion, codigo_imagen, id_dificultad, pasos, porciones, global_recipie) VALUES
("Enfrijoladas de pollo", 1, 45, "", 2, "Hervir el pollo y luego deshebrarlo\nPicar la cebolla y freirla junto con el ajo ya pelado, hasta que la cebolla se vea transparente.
 Agregar los frijoles y el chile morita. (cocinar a fuego medio por 10 minutos)\nLicuar la salsa hasta integrar los ingredientes. 
 Conservar caliente.\nPasar las tortillas por aceite hirviendo.\nTomar las tortillas y rellenarlas de pollo.\n
 Acomodar las 4 tortillas rellenas sobre un plato.\nServir la salsa de frijoles, agregar crema, pollo y queso al gusto.", 1, TRUE);
 
 INSERT INTO receta (titulo, creador, tiempo_preparacion, codigo_imagen, id_dificultad, pasos, porciones, global_recipie) VALUES
("Empanadas de carne", 1, 80, "", 3, "Vamos a iniciar nuestra receta cortando la cebolla, el pimentón, el tomate y el ajo en cuadritos.\n
Calienta un sartén con aceite.\nVamos a sofreír el ajo, cuando esté transparente le añadiremos la cebolla y mezclamos. Luego le agregaremos el pimentón y el tomate, removemos muy bien.
\nPosteriormente, le agregarás la carne y vas a mezclar muy bien hasta que se integre con las verduras. La tapamos y dejaremos cocinar por 7 minutos a fuego lento.
\nPasado ese tiempo, nuestra carne debió producir un poco de líquido por el vapor. En ese momento, le añadirás la sal y pimienta al gusto. Luego la pasta de tomate y la paprika. Mezcla muy bien hasta integrar todo.
\nTapa nuevamente y deja cocinar por 8 minutos más. Destapa la carne y deja que se reduzca todo el líquido. Debe quedar seca pero con un poco de jugo. Deja enfriar, ya que debe estar a temperatura ambiente para hacer las empanadas.
\nEn un bol, añadiremos el agua junto a la sal y el azúcar, Con una cuchara mezcla muy bien hasta disolver completamente.
\nAgrega una cucharada de aceite al agua.\nAñade progresivamente la harina de maíz precocida y vas a ir mezclando con una paleta hasta que obtengas una masa homogénea.
\nCuando esté densa, usa tus manos para terminar de amasar muy bien hasta que la masa esté súper suave y blanda.
\nSi ves que necesitas más agua o harina, puedes añadirle más a tu consideración.
\nToma una bolsa de plástico que sea dura, y la vas a cortar con una tijera hasta darle forma de rectángulo o cuadrado.
\nVas a tomar un bol, le vas a añadir agua con un poco de aceite, el cual será como tu engrasante para untarle a la bolsa de plástico y la empanada se pueda despegar fácilmente.
\nVas a tomar el harina y harás bolitas medianas y del mismo tamaño.
\nCalienta una sartén con aceite.
\nEngrasa la bolsa de plástico con el agua junto al aceite. Colocaremos una bola en el medio de la bolsa y con las yemas de los dedos, la vamos a aplastar. Debes formar una rueda o círculo plano con tu masa.
\nAñadirás en el centro el relleno. Un poco de carne molida
\nDespués de colocar el relleno vas a doblar la masa por la mitad para formar una media luna. Luego corta los bordes de masa con una taza redonda de plástico o una tapa honda. Solo debes presionar y listo. Quitas los excesos de masa.
\nVas a repetir este proceso hasta que salgan todas tus empanadas.
\nLas freirás en abundante aceite por cada lado hasta que estén súper doraditas.
\nColocas las empanadas en papel absorbente para quitarle el exceso de aceite y estén más ligeras.", 1, TRUE);

 INSERT INTO ingrediente_receta(id_ingrediente, id_receta, cantidad) VALUES(40, 5, 500), (9, 5, 1), (41, 5, 1), (8, 5, 1), (6, 5, 15), (43, 5,45),
 (4, 5, 30), (20, 5, 250), (17, 5, 480), (44, 5, 40);
 
 INSERT INTO receta (titulo, creador, tiempo_preparacion, codigo_imagen, id_dificultad, pasos, porciones, global_recipie) VALUES
("Caldo de pollo con verduras", 1, 30, "", 2, "Cocina el pollo con la cebolla, agua y sal. Lleva a ebullición, baja el fuego, tapa la olla y cocina 20 minutos. Retira la espuma que se va formando.
\nPela la zanahoria. Corta la zanahoria, chayote y calabacita en cubos del mismo tamaño. Mientras más grandes los dejes más tiempo tardaran en estar listos, yo los corto en cubos medianos.
\nAgrega la zanahoria, chayote, cilantro y cocina 15 minutos con la tapa puesta y a fuego bajo. Si usas repollo agrega desde ahorita.
\nAgrega la calabacita y cocina 5 minutos más o hasta que todas las verduras estén cocidas. Recuerda cortarlas de un tamaño parecido para que estén listas al mismo tiempo y no cortarlas tan grandes o tomarán más tiempo en estar listas.
\nSazona al gusto con sal y retira el pollo y cebolla de la olla. Deshebra o desmecha, tira el hueso y regresa el pollo a la olla. Mezcla bien y cocina si lo prefieres unos minutos más. Rectifica el sazón antes de servir y de ser necesario agrega más sal.
\nSirve caliente y acompaña con tortillas, arroz blanco o rojo (opcional) y jugo de limón.", 4, TRUE);
 
  INSERT INTO ingrediente_receta(id_ingrediente, id_receta, cantidad) VALUES(45, 6, 300), (17, 6, 2000), (13, 6, 2), (22, 6, 1), (48, 6, 2), (10, 6, 10), (9, 6, 0.25), (46, 6, 500), (6, 6, 5);
  
INSERT INTO receta (titulo, creador, tiempo_preparacion, codigo_imagen, id_dificultad, pasos, porciones, global_recipie) VALUES
("Spaghetti Rojo", 1, 15, "", 2, "Calentar agua en una olla, cuando el agua ya está sacando burbujas, romper los dos paquetes de spaghettis por la mitad y poner en la olla con el agua
\nCuando los spaghettis están listos, quitar el agua con el que se cocieron
\nEn una olla aparte, derretir la mantequilla con el puré de tomate y la media crema, mezclar hasta que está bien caliente
\nAgregar la mezcla anterior a los spaghettis secos, mezclar a fuego lento hasta integrar todo y ¡listo!", 6, TRUE);

INSERT INTO ingrediente_receta(id_ingrediente, id_receta, cantidad) VALUES(50, 7, 21), (39, 7, 250), (43, 7, 1000), (51, 7, 50);

UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Arroz.png' WHERE id_ingrediente = 1;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Huevo.png' WHERE id_ingrediente = 2;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Pollo.png' WHERE id_ingrediente = 3;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Aceite.png' WHERE id_ingrediente = 4;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Carne.png' WHERE id_ingrediente = 5;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Sal.png' WHERE id_ingrediente = 6;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Pimienta.png' WHERE id_ingrediente = 7;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Tomate.png' WHERE id_ingrediente = 8;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Cebolla.png' WHERE id_ingrediente = 9;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Cilantro.png' WHERE id_ingrediente = 10;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Limón.png' WHERE id_ingrediente = 11;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Naranja_agria.png' WHERE id_ingrediente = 12;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Zanahoria.png' WHERE id_ingrediente = 13;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Elote.png' WHERE id_ingrediente = 14;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Dientes_de_ajo.png' WHERE id_ingrediente = 15;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Aguacate.png' WHERE id_ingrediente = 16;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Agua.png' WHERE id_ingrediente = 17;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Chile_habanero.png' WHERE id_ingrediente = 18;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Chile_Morron.png' WHERE id_ingrediente = 19;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Harina.png' WHERE id_ingrediente = 20;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Lechuga.png' WHERE id_ingrediente = 21;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Chayote.png' WHERE id_ingrediente = 22;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Mayonesa.png' WHERE id_ingrediente = 23;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Guisantes.png' WHERE id_ingrediente = 24;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Atún.png' WHERE id_ingrediente = 25;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Jamón.png' WHERE id_ingrediente = 26;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Levadura.png' WHERE id_ingrediente = 27;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Chile_guajillo.png' WHERE id_ingrediente = 28;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Epazote.png' WHERE id_ingrediente = 29;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Tortilla.png' WHERE id_ingrediente = 30;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Totopos.png' WHERE id_ingrediente = 31;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Crema_ácida.png' WHERE id_ingrediente = 32;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Queso_fresco.png' WHERE id_ingrediente = 33;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Queso_oaxaca.png' WHERE id_ingrediente = 34;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Aceite_de_Oliva.png' WHERE id_ingrediente = 35;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Frijol_refrito.png' WHERE id_ingrediente = 36;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Chile_morita.png' WHERE id_ingrediente = 37;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Queso_cotija.png' WHERE id_ingrediente = 38;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Media_crema.png' WHERE id_ingrediente = 39;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Carne_de_res_molida.png' WHERE id_ingrediente = 40;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Pimentón.png' WHERE id_ingrediente = 41;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Paprika.png' WHERE id_ingrediente = 42;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Pasta_de_tomate.png' WHERE id_ingrediente = 43;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Azúcar.png' WHERE id_ingrediente = 44;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Pechuga_de_pollo.png' WHERE id_ingrediente = 45;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Repollo.png' WHERE id_ingrediente = 46;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Calabaza.png' WHERE id_ingrediente = 47;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Calabacita.png' WHERE id_ingrediente = 48;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Paquetes_de_pasta_spagetti.png' WHERE id_ingrediente = 49;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Barra_de_mantequilla.png' WHERE id_ingrediente = 50;
UPDATE ingrediente SET codigo_imagen = './Images/Ingredients/Queso_manchego.png' WHERE id_ingrediente = 51;
