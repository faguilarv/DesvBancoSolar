import { Router } from "express";

import { CuentaController } from "../controllers/cuenta.controller.js";

const router = Router();

router.get("/transferencia", CuentaController.getAllTransfer);
router.post("/transferencia", CuentaController.createTransfer);

export default router;
