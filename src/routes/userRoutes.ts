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

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post(
  "/register",
  validateUserRegistration,
  handleValidationErrors,
  registerUser
);
router.post("/login", validateUserLogin, handleValidationErrors, loginUser);
router.delete("/delete/:id", deleteUser);

export default router;
