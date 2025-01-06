import { Router } from "express";
import {
  deleteUser,
  getUserById,
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
router.get("/user/:id", getUserById);
router.post(
  "/register",
  validateUserRegistration,
  handleValidationErrors,
  registerUser
);
router.post("/login", validateUserLogin, handleValidationErrors, loginUser);
router.delete("/delete-user/:id", deleteUser);

export default router;
