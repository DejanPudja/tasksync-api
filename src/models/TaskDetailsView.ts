import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const TaskDetailsView = sequelize.define<Model<any>>(
  "TaskDetailsView",
  {
    task_id: { type: DataTypes.INTEGER, primaryKey: true },
    task_name: { type: DataTypes.STRING },
    task_description: { type: DataTypes.STRING },
    task_link: { type: DataTypes.STRING },
    project_id: { type: DataTypes.INTEGER },
    project_name: { type: DataTypes.STRING },
    created_by_user_id: { type: DataTypes.INTEGER },
    created_by_user_name: { type: DataTypes.STRING },
    assigned_user_id: { type: DataTypes.INTEGER },
    assigned_user_name: { type: DataTypes.STRING },
    tags: { type: DataTypes.JSON },
    estimated_time: { type: DataTypes.INTEGER },
    tracked_time: { type: DataTypes.INTEGER },
    due_date: { type: DataTypes.DATE },
    task_type: { type: DataTypes.STRING },
    task_status: { type: DataTypes.STRING },
    task_priority: { type: DataTypes.STRING },
    task_release: { type: DataTypes.STRING },
    parent_task_id: { type: DataTypes.INTEGER },
  },
  {
    tableName: "task_details_view",
    timestamps: false,
  }
);
