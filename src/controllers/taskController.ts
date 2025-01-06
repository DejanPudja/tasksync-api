import { Request, Response } from "express";
import { sequelize } from "../config/database";
import { Task } from "../models/task";
import { TaskDetails } from "../models/taskDetails";
import { v4 as uuidv4 } from "uuid";

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = await sequelize.transaction();

  try {
    const {
      name,
      description,
      user_id,
      project_id,
      parent_id,
      status,
      tags,
      estimated_time,
      tracked_time,
      due_date,
      type,
      priority,
      release,
    } = req.body;

    const link = uuidv4();

    const newTask = await Task.create(
      {
        name,
        description,
        link,
        user_id,
        project_id,
        parent_id,
      },
      { transaction }
    );

    const taskDetails = await TaskDetails.create(
      {
        task_id: newTask.get("id"),
        assigned_to: user_id,
        tags,
        estimated_time,
        tracked_time,
        due_date,
        type,
        status,
        priority,
        release,
      },
      { transaction }
    );

    await transaction.commit();

    res.status(201).json({
      message: "Task created successfully!",
      task: newTask,
      details: taskDetails,
      success: true,
    });
  } catch (error: any) {
    await transaction.rollback();

    res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
      success: false,
    });
  }
};
