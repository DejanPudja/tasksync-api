import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const TaskDetails = sequelize.define<Model<any>>(
  "TaskDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tasks",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    assigned_to: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    estimated_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tracked_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("epic", "story", "task", "bug", "milestone"),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(
        "backlog",
        "estimate",
        "ready to proceed",
        "bugs found",
        "in progress",
        "qa ready",
        "qa review",
        "deployment",
        "client review",
        "on hold",
        "done",
        "ready to bill",
        "completed"
      ),
      allowNull: false,
      defaultValue: "backlog",
    },
    priority: {
      type: DataTypes.ENUM("low", "normal", "high", "urgent"),
      allowNull: true,
    },
    release: {
      type: DataTypes.ENUM(
        "local",
        "develop",
        "staging",
        "live",
        "non-release",
        "beta env."
      ),
      allowNull: true,
    },
  },
  {
    tableName: "task_details",
    timestamps: true,
  }
);

export default TaskDetails;
