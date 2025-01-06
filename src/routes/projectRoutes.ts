import { Router } from "express";
import {
  deleteProject,
  getProjectById,
  getProjects,
} from "../controllers/projectController";

const router = Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.delete("/delete/:id", deleteProject);

export default router;
