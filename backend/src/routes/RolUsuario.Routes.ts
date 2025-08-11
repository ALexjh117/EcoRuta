import { Router } from "express";
import { RolUsuarioController } from '../controllers/RolUsuarioController'
import { validateIdRolusuario, validateIdRolUsuarioYaExiste, validateRolUsuarioBody } from "../middlewares/RolUsuario";
import { handleInputErrors } from "../middlewares/Validation";

const router = Router()
router.get('/', RolUsuarioController.getAllRolUser)

router.get('/:id', 
    validateIdRolusuario,
    handleInputErrors,
    RolUsuarioController.getAllRolUserId
)

router.post('/', 
    validateRolUsuarioBody,
    validateIdRolUsuarioYaExiste,
    handleInputErrors,
    RolUsuarioController.crearRolUser
)

router.put('/:id', 
    validateRolUsuarioBody,
    validateIdRolusuario,
    handleInputErrors,
    RolUsuarioController.ActualizarRolUser
)

router.delete("/:id", 
    validateIdRolusuario,
    handleInputErrors,
    RolUsuarioController.EliminarRolUser
);

export default router;