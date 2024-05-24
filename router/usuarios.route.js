import { Router } from "express";
import { UsuarioController } from "../controllers/usuarios.controller.js";

const route = Router();

route.get("/usuarios", UsuarioController.findAllUsuarios);
route.post("/usuario", UsuarioController.createUsuarios);

export default route;
