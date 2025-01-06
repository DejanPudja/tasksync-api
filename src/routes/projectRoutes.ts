import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
} from "../controllers/projectController";
import { handleValidationErrors } from "../middlewares/validationResultHandler";
import { validateCreateProject } from "../validators/projectValidation";

const router = Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.delete("/delete/:id", deleteProject);
router.post(
  "/create",
  validateCreateProject,
  handleValidationErrors,
  createProject
);

export default router;
