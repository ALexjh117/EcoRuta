// routes/admin.ts
import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authorizeAdmin"
import { AdminController } from "../controllers/AdminController";

const router = Router();

// Rutas protegidas (solo admin)
router.get("/users", authenticate, authorizeAdmin, AdminController.getUsers);
router.get("/routes", authenticate, authorizeAdmin, AdminController.getRoutes);
router.get("/reports/pdf", authenticate, authorizeAdmin, AdminController.generatePdfReport);
router.get("/reports/excel", authenticate, authorizeAdmin, AdminController.generateExcelReport);

export default router;
