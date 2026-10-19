CREATE DATABASE quiz__db;
USE quiz__db;

CREATE TABLE Usuario (
    id_usuario      INT AUTO_INCREMENT PRIMARY KEY,
    nome            VARCHAR(100) NOT NULL,
    email           VARCHAR(100) NOT NULL,
    idade           VARCHAR(5),
    sexo            VARCHAR(25),
    part_favorita   VARCHAR(10)
);

CREATE TABLE Respostas (
    id_respostas    INT AUTO_INCREMENT PRIMARY KEY,
    num_pergunta	INT,
    descricao       VARCHAR(255) NOT NULL,
    id_usuario      INT,
FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario)
);


-- Metodo para clear nos dados (rodar um de cada vez)
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE Respostas;
TRUNCATE TABLE Usuario;

SET FOREIGN_KEY_CHECKS = 1;

