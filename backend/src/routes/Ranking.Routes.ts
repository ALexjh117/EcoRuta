import { Router } from "express";
import { handleInputErrors } from "../middlewares/Validation";
import { RankingController } from "../controllers/RankignController";
import { validateBodyRanking, validateIdRanking } from "../middlewares/Ranking";


const router = Router()


router.get('/', RankingController.getAllRanking)

router.get('/:id',
    validateIdRanking,
    handleInputErrors,
    RankingController.getRankingById
)

router.post('/',
    validateBodyRanking,
    handleInputErrors,
    RankingController.createRanking
)

router.put('/:id',
    validateIdRanking,
    validateBodyRanking,
    handleInputErrors,
    RankingController.ActualizarRanking
)

router.delete('/:id',
    validateIdRanking,
    handleInputErrors,
    RankingController.EliminarRanking
)

export default router