import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { handleInputErrors } from "../middlewares/Validation";
import { validateIdUsuario, validateUsuarioExiste, validateusuarioBody } from "../middlewares/Usuario";
import { authenticate, authorizeAdmin } from "../middlewares/authorizeAdmin";
const router = Router()
router.get("/test", authenticate, authorizeAdmin, (req, res) => {
  return res.json({
    ok: true,
    usuarioId: req.usuarioId,
    usuarioRol: req.usuarioRol,
    usuarioDB: req.usuario ? { ...(req.usuario as any).dataValues } : null,
  });
});
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

router.post('/login-google', UsuarioController.googleLogin) //Crear usuario con google


export default router