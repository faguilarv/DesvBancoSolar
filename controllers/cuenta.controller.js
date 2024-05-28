import { CuentaModel } from "../models/cuenta.model.js";

//Obtener todas las transferencias desde el model
const getAllTransfer = async (req, res) => {
  try {
    const transferencia = await CuentaModel.getAllTransfer();
    return res.json(transferencia);
  } catch (error) {
    console.log(error);
    const { code, msg } = handleError(error);
    return res
      .status(code)
      .json({ ok: false, msg: " se a detectado un error " });
  }
};

//crear Transferencia obtenido del model

const createTransfer = async (req, res) => {
  try {
    const { emisor, receptor, monto } = req.body;
    console.log("Emisor:", emisor);
    console.log("Receptor:", receptor);
    console.log("Monto:", monto);

    const transferencia = await CuentaModel.createTransferencia(
      emisor,
      receptor,
      monto
    );
    return res.status(201).json(transferencia);
  } catch (error) {
    console.log(error);
    const { code, msg } = handleError(error);
    return res
      .status(code)
      .json({ ok: false, msg: " se a detectado un error al transferir" });
  }
};

export const CuentaController = {
  getAllTransfer,
  createTransfer,
};
