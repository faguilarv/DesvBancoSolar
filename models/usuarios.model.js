import { pool } from "../database/connection.js";

//Llamar todos los usuarios a la Base

const findAllUsuarios = async () => {
  const { rows } = await pool.query(" SELECT * FROM USUARIOS");
  return rows;
};

//Crear Usuarios y su Balance Saldo

const createUsuarios = async ({ nombre, balance }) => {
  const query = {
    text: `
        INSERT INTO usuarios (nombre,balance)
        VALUES ($1, $2)
        RETURNING *
        `,
    values: [nombre, balance],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
//Editamos usuario en la baseDatos
const UpdateUser = async (usuario) => {
  const query = {
    text: `
    UPDATE USUARIOS SET NOMBRE = $2,
    BALANCE = $3
    WHERE ID = $1
    RETURNING *
    `,
    values: [usuario.id, usuario.nombre, usuario.balance],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
//Eliminar Usuarios.

const removeUser = async (id) => {
  const query = {
    text: `
        DELETE FROM USUARIOS WHERE ID= $1 RETURNING *
        
        `,
    values: [id],
  };

  const { rows } = await pool.query(query);
  return rows[0];
};

//exporta las constantes hacia el controlador
export const UsuarioModel = {
  findAllUsuarios,
  createUsuarios,
  removeUser,
  UpdateUser,
};
