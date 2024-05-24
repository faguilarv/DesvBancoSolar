import { pool } from "../database/connection.js";

const findAllUsuarios = async () => {
  const { rows } = await pool.query(" SELECT * FROM USUARIOS");
  return rows;
};

const createUsuarios = async ({ nombre, balance, id }) => {
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

export const UsuarioModel = {
  findAllUsuarios,
  createUsuarios,
};
