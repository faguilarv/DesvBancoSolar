import { Router } from "express";
import { UsuarioController } from "../controllers/usuarios.controller.js";

const route = Router();

route.get("/usuarios", UsuarioController.findAllUsuarios);
route.post("/usuario", UsuarioController.createUsuarios);
route.delete("/usuario/:id", UsuarioController.removeUser);
route.put("/usuario/:id", UsuarioController.UpdateUsuario);

export default route;
