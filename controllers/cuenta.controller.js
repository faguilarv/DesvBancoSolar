import { CuentaModel } from "../models/cuenta.model.js";

//Obtener todas las transferencias desde el model
const getAllTransfer = async (req, res) => {
  try {
    const transferencia = await CuentaModel.getAllTransfer();
    return res.json(transferencia);
  } catch (error) {
    console.log(error);
    return res.status(500)({ ok: false, msg: "Se ha producido un error" });
  }
};

//crear Transferencia obtenido del model

const createTransfer = async (req, res) => {
  try {
    const { emisor, receptor, monto } = req.body;

    const transferencia = await CuentaModel.createTransferencia(
      emisor,
      receptor,
      monto
    );
    return res.status(201).json(transferencia);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, msg: " se a detectado un error al transferir" });
  }
};

export const CuentaController = {
  getAllTransfer,
  createTransfer,
};