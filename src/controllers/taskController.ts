import { Request, Response } from "express";
import { sequelize } from "../config/database";
import { Task } from "../models/task";
import { TaskDetails } from "../models/taskDetails";
import { v4 as uuidv4 } from "uuid";
import { TaskDetailsView } from "../models/TaskDetailsView";

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

// export const updateTask = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const transaction = await sequelize.transaction();

//   try {
//     const { id } = req.params;
//     const {
//       name,
//       description,
//       user_id,
//       project_id,
//       parent_id,
//       status,
//       tags,
//       estimated_time,
//       tracked_time,
//       due_date,
//       type,
//       priority,
//       release,
//     } = req.body;

//     const existingTask = await Task.findOne({ where: { id } });
//     if (!existingTask) {
//       res.status(404).json({
//         message: "Task not exist!",
//         success: false,
//         task: [],
//       });
//       return;
//     }

//     await Task.update(
//       {
//         name,
//         description,
//         user_id,
//         project_id,
//         parent_id,
//       },
//       { where: { id }, transaction }
//     );

//     await TaskDetails.update(
//       {
//         assigned_to: user_id,
//         tags,
//         estimated_time,
//         tracked_time,
//         due_date,
//         type,
//         status,
//         priority,
//         release,
//       },
//       { where: { task_id: id }, transaction }
//     );

//     const updatedTask = await Task.findOne({
//       where: { id },
//       include: [
//         {
//           model: TaskDetails,
//           as: "details",
//         },
//       ],
//     });

//     await transaction.commit();

//     res.status(200).json({
//       message: "Task updated successfully!",
//       task: updatedTask,
//       success: true,
//     });
//   } catch (error: any) {
//     await transaction.rollback();

//     res.status(500).json({
//       message: "Internal Server Error!",
//       error: error.message,
//       success: false,
//     });
//   }
// };

export const getTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await TaskDetailsView.findOne({ where: { task_id: id } });

    if (!task) {
      res.status(404).json({
        message: "Task not exist!",
        success: false,
        task: [],
      });
      return;
    }

    res.status(200).json({
      success: true,
      task: task,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
      success: false,
    });
  }
};

export const getTasksByProjectId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const project_id = parseInt(req.params.id, 10);
    const tasks = await TaskDetailsView.findAll({ where: { project_id } });

    if (!tasks || tasks.length === 0) {
      res.status(404).json({
        message: "No tasks found for this project!",
        success: false,
        tasks: [],
      });
      return;
    }

    res.status(200).json({
      success: true,
      tasks: tasks,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
      success: false,
    });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id },
      transaction,
    });

    if (!task) {
      await transaction.rollback();
      res.status(404).json({
        message: "Task does not exist!",
        success: false,
      });
      return;
    }

    const taskDetails = await TaskDetails.findOne({
      where: { task_id: id },
      transaction,
    });

    if (taskDetails) {
      await taskDetails.destroy({ transaction });
    }

    await task.destroy({ transaction });

    await transaction.commit();

    res.status(200).json({
      message: "Task successfully deleted!",
      success: true,
    });
  } catch (error: any) {
    await transaction.rollback();

    res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: error.message,
    });
  }
};
