CREATE TABLE IF NOT EXISTS clientes(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Nombre_del_cliente NVARCHAR(255),
    Nit NVARCHAR(255) NOT NULL,
    Nombre_del_punto NVARCHAR(255),
    Nombre_del_equipo NVARCHAR(255),
    Ciudad NVARCHAR(255),
    Promotor NVARCHAR(255),
    RTC INT,
    Capitan NVARCHAR(255),
    Fecha DATE,
    Ip NVARCHAR(255)
);