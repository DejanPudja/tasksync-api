import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasksByProjectId,
} from "../controllers/taskController";
import { handleValidationErrors } from "../middlewares/validationResultHandler";
import { validateTaskCreation } from "../validators/taskValidation";

const router = Router();

router.get("/:id", getTaskById);
router.get("/project/:id", getTasksByProjectId);
router.post(
  "/create",
  validateTaskCreation,
  handleValidationErrors,
  createTask
);
router.delete("/delete/:id", deleteTask);

export default router;
