import { UsuarioModel } from "../models/usuarios.model.js";

//consultar todos los usuario
const findAllUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.findAllUsuarios();
    return res.json(usuarios);
  } catch (error) {
    console.log(error);
  }
};

//crear usuarios
const createUsuarios = async (req, res) => {
  console.log(req.body);
  try {
    const { nombre, balance } = req.body;

    const newUser = {
      nombre,
      balance,
    };

    const create = await UsuarioModel.createUsuarios(newUser);
    return res.json(create);
  } catch (error) {
    //manejo de errores
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const UsuarioController = {
  findAllUsuarios,
  createUsuarios,
};
