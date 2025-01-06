import { Request, Response } from "express";
import Project from "../models/project";

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await Project.findAll({});

    res.status(200).json({
      users: projects,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: error.message,
    });
  }
};

export const getProjectById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({
      where: { id },
    });

    if (!project) {
      res.status(404).json({
        message: "Project not exist!",
        success: false,
        project: [],
      });
      return;
    }

    res.status(200).json({
      project: project,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: error.message,
    });
  }
};

export const deleteProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({
      where: { id },
    });

    if (!project) {
      res.status(404).json({
        message: "Project not exist!",
        success: false,
      });
      return;
    }

    await project.destroy();

    res.status(200).json({
      message: "Project successfully deleted!",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: error.message,
    });
  }
};
