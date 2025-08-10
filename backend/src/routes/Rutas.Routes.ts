import { Router } from "express";
import { RutasController } from "../controllers/RutasController";
import { validateIdRuta, validateRutaBody } from '../middlewares/Rutas'

const router = Router();

router.get("/", RutasController.getAllRutas);
router.get("/:id", 
    validateIdRuta, 
    RutasController.getRutasId
);
router.post("/", 
    validateRutaBody, 
    RutasController.crearRutas
);
router.put("/:id", 
    validateIdRuta, 
    validateRutaBody, 
    RutasController.ActualizarRutas
);
router.delete("/:id", 
    validateIdRuta, RutasController.EliminarRutas
);

export default router;
