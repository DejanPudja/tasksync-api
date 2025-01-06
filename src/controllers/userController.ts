import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching users." });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const newUser = await User.create({ name, email, password, role });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
