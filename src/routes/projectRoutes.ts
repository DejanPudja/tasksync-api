import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  getProjectsByUserId,
  updateProject,
} from "../controllers/projectController";
import { handleValidationErrors } from "../middlewares/validationResultHandler";
import {
  validateCreateProject,
  validateUpdateProject,
} from "../validators/projectValidation";

const router = Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.get("/user/:id", getProjectsByUserId);
router.delete("/delete/:id", deleteProject);
router.post(
  "/create",
  validateCreateProject,
  handleValidationErrors,
  createProject
);
router.put(
  "/update/:id",
  validateUpdateProject,
  handleValidationErrors,
  updateProject
);

export default router;
