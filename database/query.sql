DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY,
	nombre VARCHAR  (50) not null ,
	balance FLOAT CHECK (balance >= 0)
);

INSERT INTO usuarios (nombre, balance) VALUES 
('Francisco Aguilar', 95000),
('Luis Rivas', 80000),
('Felipe Cuevas', 50000);

select * from usuarios;

CREATE TABLE transferencias (
	id SERIAL PRIMARY KEY,
	emisor INT,
	receptor INT,
	monto FLOAT,
	fecha TIMESTAMP,
	FOREIGN KEY (emisor) REFERENCES usuarios(id) ON DELETE CASCADE,,
	FOREIGN KEY (receptor) REFERENCES usuarios(id) ON DELETE CASCADE,

);