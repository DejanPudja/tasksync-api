import { Optional } from "sequelize";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export interface ProjectAttributes {
  id?: number;
  name: string;
  user_id?: number | null;
  status: "active" | "complete";
  createdAt?: Date;
  updatedAt?: Date;
}
