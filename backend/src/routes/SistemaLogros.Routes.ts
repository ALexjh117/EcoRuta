import { Router } from "express";
import { handleInputErrors } from "../middlewares/Validation";
import { SistemaLogros } from "../controllers/SistemaLogrosController";
import { validateSystemLogroBody, validateSystemLogroId } from "../middlewares/SistemaLogros";


const router = Router()

router.get('/', SistemaLogros.getAllSitemaLogros)
router.get("/ranking", SistemaLogros.getRankingUsuarios);
router.get('/:id',
validateSystemLogroId,
handleInputErrors,
SistemaLogros.getSistemaLogrosId
)

router.post('/', 
    validateSystemLogroBody,
    handleInputErrors,
    SistemaLogros.crearSistemaLogros
)

router.put('/:id', 
    validateSystemLogroBody,
    validateSystemLogroId,
    handleInputErrors,
    SistemaLogros.actualizarSistemaLogros
)


router.delete('/:id',
    validateSystemLogroId,
    handleInputErrors,
    SistemaLogros.eliminarSitemaLogros
)


export default router