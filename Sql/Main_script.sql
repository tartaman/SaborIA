DROP DATABASE IF EXISTS Palace_Resort;
CREATE DATABASE Palace_Resort;
USE Palace_Resort;
CREATE TABLE Usuario (
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    id_hotel int, 
    nombre VARCHAR(255),
    apellido_paterno VARCHAR(255),
    apellido_materno VARCHAR(255),
    email VARCHAR(255),
    direccion VARCHAR(255),
    celular VARCHAR(12),
    id_genero int,
    fecha_nacimiento datetime,
	id_ciudad int,
    fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool
);
ALTER TABLE Usuario
ADD FOREIGN KEY (usuario_creacion) REFERENCES Usuario(id_usuario);
ALTER TABLE Usuario
ADD FOREIGN KEY (usuario_actualizacion) REFERENCES Usuario(id_usuario);
CREATE TABLE Ciudad (
	id_ciudad INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    id_pais int,
    fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);
CREATE TABLE Pais(
	id_pais int primary key auto_increment,
    nombre varchar(255),
    continente varchar(25),
    fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);
ALTER TABLE Ciudad 
ADD FOREIGN KEY (id_pais) REFERENCES Pais(id_pais);
ALTER TABLE Usuario 
ADD FOREIGN KEY (id_ciudad) references Ciudad(id_ciudad);

CREATE TABLE Genero (
	id_genero int primary key auto_increment,
    descripcion varchar(255),
    fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);
ALTER TABLE Usuario
ADD FOREIGN KEY (id_genero) REFERENCES Genero(id_genero);

CREATE TABLE Lenguaje (
	id_lenguaje int primary key auto_increment,
    nombre varchar(255),
    fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

CREATE TABLE Cliente(
	id_cliente int primary key auto_increment,
    ciudad int,
    email varchar(255),
    direccion varchar(532),
    celular varchar(12),
    id_genero int,
    fecha_nacimiento date,
    id_lenguaje int,
    id_pais int,
    fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (ciudad) references Ciudad(id_ciudad),
    foreign key (id_genero) references Genero(id_genero),
    foreign key (id_lenguaje) references Lenguaje(id_lenguaje),
    foreign key (id_pais) references Pais(id_pais),
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

CREATE TABLE Media_type(
	id_media_type int primary key auto_increment,
    nombre varchar(255),
    fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

CREATE TABLE Media (
	id_media int primary key auto_increment,
    descripcion varchar(255),
    id_media_type int,
    URL text,
    nombre varchar(255),
    fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (id_media_type) references Media_type(id_media_type),
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

CREATE TABLE habitacion_media (
    id_media  int,
    id_habitacion int,
    primary key (id_media, id_habitacion),
	fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

CREATE TABLE Amenidades (
	id_amenidades int primary key auto_increment,
    nombre varchar(255),
    descripcion varchar(532),
    is_priority bool,
    html_icon varchar(255),
    fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

CREATE TABLE habitacion_amenidades(
	id_amenidad  int,
    id_habitacion int,
	fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario),
    primary key (id_amenidad, id_habitacion)
);	

CREATE TABLE Cama (
	id_cama int primary key auto_increment,
    nombre varchar(255),
	fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);	

CREATE TABLE Estado_habitacion (
	id_estado int primary key auto_increment,
    estado_hab varchar(50),
     fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

CREATE TABLE Disponibilidad_hotel(
	id_disponibilidad_hotel int primary key auto_increment,
    estado_disponibilidad varchar(50),
	fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

CREATE TABLE Hotel(
	id_hotel int primary key auto_increment,
    id_ciudad int,
    id_estado_hotel int,
	fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (id_ciudad) references Ciudad(id_ciudad),
    foreign key (id_estado_hotel) references Disponibilidad_hotel(id_disponibilidad_hotel),
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);
ALTER TABLE Usuario
ADD FOREIGN KEY (id_hotel) references Hotel(id_hotel);
CREATE TABLE Habitacion (
	id_habitacion int primary key auto_increment,
    numero_habitacion varchar(20),
    nombre varchar(100),
    descripcion text,
    descripcion_corta varchar(100),
    ocupacion_maxima int,
    ocupacion_minima int,
    maximo_adultos int,
    minimo_adultos int,
    maximo_child int,
    ocupacion_estandar int,
    costo decimal,
    id_hotel int,
    id_estado int,
    id_cama int,
	fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (id_hotel) references Hotel(id_hotel),
    foreign key (id_estado) references Estado_habitacion(id_estado),
    foreign key (id_cama) references Cama(id_cama),
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

CREATE TABLE Politica (
	id_politica int primary key auto_increment,
    nombre varchar(255),
    descripcion text,
    fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

CREATE TABLE Politica_reserva (
	id_politica_reserva int primary key auto_increment,
    id_reserva int,
    id_politica int,
	fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (id_politica) references Politica(id_politica),
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

CREATE TABLE Servicio (
	id_servicio int primary key auto_increment,
    nombre varchar(255),
    descripcion text,
    costo decimal,
	fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

CREATE TABLE Info_reserva_servicio (
	id_info_reserva_servicio int primary key auto_increment,
    id_reserva int, 
    id_cliente int,
    fecha datetime,
    id_servicio int,
    num_personas int,
     fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (id_cliente) references Cliente(id_cliente),
    foreign key (id_servicio) references Servicio(id_servicio),
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

CREATE TABLE Estado_reserva(
	id_estado_reserva int primary key auto_increment,
    nombre varchar(50),
     fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

CREATE TABLE Tipo_reserva (
	id_tipo_reserva int auto_increment primary key,
    nombre varchar(100),
     fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

CREATE TABLE Reserva( 
	id_reserva int auto_increment primary key,
    id_estado_reserva int,
    id_tipo_reserva int,
    total decimal,
    pago_faltante decimal,
     fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (id_estado_reserva) references Estado_reserva(id_estado_reserva),
    foreign key (id_tipo_reserva) references Tipo_reserva(id_tipo_reserva),
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

Alter table Politica_reserva
ADD FOREIGN KEY (id_reserva) references Reserva(id_reserva);
Alter table Info_reserva_servicio
ADD FOREIGN KEY (id_reserva) references Reserva(id_reserva);

CREATE TABLE Divisa (
	id_divisa int primary key auto_increment,
    nombre varchar(100),
	fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

CREATE TABLE Estado_pago (
	id_estado_pago int auto_increment primary key,
    nombre varchar(100),
    fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);

CREATE TABLE Tipo_pago(
	id_tipo_pago int primary key auto_increment,
    nombre varchar(100),
    fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);
CREATE TABLE Tipo_promocion (
	id_tipo_promocion int auto_increment primary key,
    nombre varchar(50),
    fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);
CREATE TABLE Promocion (
	id_promocion int auto_increment primary key,
    descripcion text,
    id_tipo_promocion int,
    fecha_finalizacion date,
    fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (id_tipo_promocion) references Tipo_promocion(id_tipo_promocion),
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);
CREATE TABLE Monto (
	id_monto int auto_increment primary key,
    monto_sin_impuestos decimal,
    monto_sin_promocion decimal,
    monto_con_promocion decimal,
    monto_a_pegar decimal,
    id_reserva int,
    fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);
CREATE TABLE Promocion_monto (
	id_promocion int,
    id_monto int,
    fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);
CREATE TABLE Pago(
	id_pago int auto_increment primary key,
    id_monto int, 
    id_tipo_pago int,
    id_estado_pago int,
    cantidad_pago decimal,
    divisa int,
    tasa_de_cambio decimal,
    fecha datetime,
    descripcion_pago text,
    fecha_creacion datetime,
    usuario_creacion int,
    fecha_actualizacion datetime,
    usuario_actualizacion int,
    estado bool,
    foreign key (id_monto) references Monto(id_monto),
    foreign key (id_tipo_pago) references Tipo_pago(id_tipo_pago),
    foreign key (id_estado_pago) references Estado_pago(id_estado_pago),
    foreign key (usuario_creacion) references Usuario(id_usuario),
    foreign key (usuario_actualizacion) references Usuario(id_usuario)
);