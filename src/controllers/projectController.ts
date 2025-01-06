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
