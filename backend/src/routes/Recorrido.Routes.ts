import { Router } from "express";
import { RecorridosController } from "../controllers/RecorridoController";
import { validateIdRecorrido, validateRecorridoBody } from "../middlewares/Recorrido";
import { handleInputErrors } from "../middlewares/Validation";


const router = Router();

router.get("/", RecorridosController.getAllRecorrido);
router.get("/usuario/:id_usuario", RecorridosController.getRecorridosPorUsuario);
router.get("/:id", 
    validateIdRecorrido, 
    handleInputErrors,
    RecorridosController.getRecorridoId
);

router.post("/", 
    validateRecorridoBody, 
    handleInputErrors,
    RecorridosController.crearRecorrido
);

router.put("/:id", 
    validateIdRecorrido, 
    validateRecorridoBody, 
    handleInputErrors,
    RecorridosController.ActualizarRecorrido
);

router.delete("/:id", 
    validateIdRecorrido, 
    RecorridosController.EliminarRecorrido
);



export default router;
