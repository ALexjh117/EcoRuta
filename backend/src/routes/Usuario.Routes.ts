import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { handleInputErrors } from "../middlewares/Validation";
import { validateIdUsuario, validateUsuarioExiste, validateusuarioBody } from "../middlewares/Usuario";

const router = Router()

router.get('/', UsuarioController.getAll)

router.get('/:id',
    validateIdUsuario, 
    handleInputErrors, 
    UsuarioController.getUserId
)

router.post('/', 
    validateUsuarioExiste,
    validateusuarioBody,
    handleInputErrors,
    UsuarioController.CrearUser
)

router.put('/:id', 
    validateIdUsuario,
    validateusuarioBody,
    handleInputErrors,
    UsuarioController.ActualizarUser
)

router.delete('/:id', 
    UsuarioController.eliminarUserId
)
router.post('/login', UsuarioController.loginUser);



export default router