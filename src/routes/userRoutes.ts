import { Router } from "express";
import { getUsers, registerUser } from "../controllers/userController";
import { validateUserRegistration } from "../validators/userValidation";
import { handleValidationErrors } from "../middlewares/validationResultHandler";

const router = Router();

router.get("/users", getUsers);
router.post(
  "/register",
  validateUserRegistration,
  handleValidationErrors,
  registerUser
);

export default router;
