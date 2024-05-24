import "dotenv/config";
import express from "express";
import rutauser from "./router/usuarios.route.js";
const app = express();
const __dirname = import.meta.dirname;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//rutas
app.use("/", rutauser);
//coneccion al puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Conectado exitosamente al puerto ${PORT}`);
});
