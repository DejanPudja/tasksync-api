import { Request, Response } from "express";
import bcrypt from "bcrypt";
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

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, role = "user" } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res
        .status(400)
        .json({ message: "Email is already in use!", success: false });
      return;
    }

    const newUser = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    });

    const { password: _, ...formattedUser } = newUser.toJSON();

    res.status(201).json({
      message: "User created successfully!",
      user: formattedUser,
      success: true,
    });
  } catch (error: any) {
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({
        message: "Validation Error",
        errors: error.errors.map((err: any) => err.message),
        success: false,
      });
    } else {
      res.status(500).json({
        message: "Internal Server Error!",
        error: error.message,
        success: false,
      });
    }
  }
};
