import { Request, Response } from "express";
import Project from "../models/project";

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await Project.findAll({});

    res.status(200).json({
      projects: projects,
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

export const getProjectsByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user_id = parseInt(req.params.id, 10);
    const projects = await Project.findAll({
      where: { user_id },
    });

    if (!projects) {
      res.status(404).json({
        message: "Projects do not exist!",
        success: false,
        projects: [],
      });
      return;
    }

    res.status(200).json({
      projects: projects,
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

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, user_id, status } = req.body;

    const existingProject = await Project.findOne({ where: { name } });

    if (existingProject) {
      res
        .status(400)
        .json({ message: "The name is already in use!", success: false });
      return;
    }

    const newProject = await Project.create({
      name,
      user_id,
      status,
    });

    res.status(201).json({
      message: "Project created successfully!",
      project: newProject,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
      success: false,
    });
  }
};

export const updateProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, user_id, status } = req.body;

    const existingProject = await Project.findOne({ where: { id } });

    if (!existingProject) {
      res.status(400).json({ message: "Project not exist!", success: false });
      return;
    }

    await Project.update({ name, user_id, status }, { where: { id } });

    const updatedProject = await Project.findOne({ where: { id } });

    res.status(201).json({
      message: "Project created successfully!",
      project: updatedProject,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
      success: false,
    });
  }
};
