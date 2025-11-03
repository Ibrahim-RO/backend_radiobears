// src/routes/newsRoutes.ts
import { Router } from "express";
import multer from "multer";
import { NewsController } from "../controllers/NewsController";

const router = Router();
const upload = multer();

router.get("/", NewsController.getAll);
router.get("/:id", NewsController.getById);
router.post("/", upload.single("image"), NewsController.create);
router.put("/:id", upload.single("image"), NewsController.update);
router.delete("/:id", NewsController.delete)

export default router;
