import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { TaskAttributes } from "../utils/types";

export const Task = sequelize.define<Model<TaskAttributes>>(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "projects",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "tasks",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    // status: {
    //   type: DataTypes.ENUM(
    //     "backlog",
    //     "estimate",
    //     "ready to proceed",
    //     "bugs found",
    //     "in progress",
    //     "qa ready",
    //     "qa review",
    //     "deployment",
    //     "client review",
    //     "on hold",
    //     "done",
    //     "ready to bill",
    //     "completed"
    //   ),
    //   allowNull: false,
    //   defaultValue: "backlog",
    // },
    // priority: {
    //   type: DataTypes.ENUM("low", "normal", "high", "urgent"),
    //   allowNull: false,
    //   defaultValue: "low",
    // },
  },
  {
    tableName: "tasks",
    timestamps: true,
  }
);

export default Task;
