import { Router } from "express";
import { getUsers, createUser } from "../controllers/userController";

const router = Router();

router.get("/users", getUsers);
router.post("/add-user", createUser);

export default router;
