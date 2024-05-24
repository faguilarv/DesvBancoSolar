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
//Editar usuario
const UpdateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, balance } = req.body;
    if (!nombre || !balance) {
      return res.json({ ok: false, msg: "Todos los campos son obligatorios" });
    }
    const UpdateUsuario = {
      id,
      nombre,
      balance,
    };
    const usuario = await UsuarioModel.UpdateUsuario(UpdateUsuario);
    return res.json(usuario);
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

//eliminar usuario

const removeUser = async (req, res) => {
  console.log(req.params);
  try {
    const { id } = req.params;
    const usuarios = await UsuarioModel.removeUser(id);
    return res.json(usuarios);
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

//exporto los variables
export const UsuarioController = {
  findAllUsuarios,
  createUsuarios,
  removeUser,
  UpdateUsuario,
};
