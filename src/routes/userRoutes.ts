import { Router } from "express";
import {
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/userController";
import {
  validateUserRegistration,
  validateUserLogin,
} from "../validators/userValidation";
import { handleValidationErrors } from "../middlewares/validationResultHandler";

const router = Router();

router.get("/users", getUsers);
router.post(
  "/register",
  validateUserRegistration,
  handleValidationErrors,
  registerUser
);
router.post("/login", validateUserLogin, handleValidationErrors, loginUser);

export default router;
