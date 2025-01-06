import { Router } from "express";
import { createTask } from "../controllers/taskController";
import { handleValidationErrors } from "../middlewares/validationResultHandler";
import { validateTaskCreation } from "../validators/taskValidation";

const router = Router();

// router.get("/", getUsers);
router.post(
  "/create",
  validateTaskCreation,
  handleValidationErrors,
  createTask
);

export default router;
