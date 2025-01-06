import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { UserAttributes, UserCreationAttributes } from "../utils/types";

export const User = sequelize.define<
  Model<UserAttributes, UserCreationAttributes>
>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("superadmin", "admin", "user", "guest"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default User;
