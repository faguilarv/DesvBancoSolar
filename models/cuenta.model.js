import { pool } from "../database/connection.js";

const getAllTransfer = async () => {
  const { rows } = await pool.query(`SELECT
    tr.id as transferencia_id,
    em.id as emisor_id,
    em.nombre as emisor_nombre,
    re.id as receptor_id,
    re.nombre as receptor_nombre,
    tr.monto,
    tr.fecha
    FROM transferencias tr
    JOIN
    usuarios em ON tr.emisor = em.id
    JOIN
    usuarios re ON tr.receptor = re.id;`);
  return rows;
};

const createTransferencia = async (emisor, receptor, monto) => {
  try {
    await pool.query("BEGIN");

    const emisorUpdateQuery = {
      text: `
          UPDATE USUARIOS
          SET BALANCE = BALANCE - $1
          WHERE ID = $2
      `,
      values: [monto, emisor],
    };
    await pool.query(emisorUpdateQuery);

    const receptorUpdateQuery = {
      text: `
          UPDATE USUARIOS
          SET BALANCE = BALANCE + $1
          WHERE ID = $2
      `,
      values: [monto, receptor],
    };
    await pool.query(receptorUpdateQuery);
    //
    const transferenciaInsertQuery = {
      text: `
          INSERT INTO TRANSFERENCIAS (EMISOR, RECEPTOR, MONTO, FECHA)
          VALUES ($1, $2, $3, NOW())
          RETURNING *
      `,
      values: [emisor, receptor, monto],
    };
    const { rows } = await pool.query(transferenciaInsertQuery);
    await pool.query("COMMIT");
    return rows[0];
  } catch (error) {
    console.log(error);
    await pool.query("ROLLBACK");
  }
};

export const CuentaModel = {
  getAllTransfer,
  createTransferencia,
};
