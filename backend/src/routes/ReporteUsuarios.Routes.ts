import { Router } from "express";
import { ReportesUsuariosController } from "../controllers/ReportesUsuariosController";
import { handleInputErrors } from "../middlewares/Validation";
import { validateIdReporteUser, validateBodyReporteUser } from "../middlewares/ReportesUsuarios";
import { validateIdUsuario } from "../middlewares/Usuario";

const router = Router()

router.get('/', ReportesUsuariosController.getAllReporteUsuario)

router.get('/:id',
    validateIdReporteUser, 
    handleInputErrors,  
    ReportesUsuariosController.getReporteUsuarioId
)

router.post('/', 
    validateBodyReporteUser,
    handleInputErrors,
    ReportesUsuariosController.crearReporteUsuario
)

router.put('/:id', 
    validateIdReporteUser,
    validateBodyReporteUser,
    handleInputErrors,
    ReportesUsuariosController.ActualizarReporteUsuario
)

router.delete('/:id',
    ReportesUsuariosController.EliminarReporteUsuario
)


export default router