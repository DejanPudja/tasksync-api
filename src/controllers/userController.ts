import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });

    res.status(200).json({
      users: users,
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

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      attributes: ["id", "name", "email", "role"],
    });

    if (!user) {
      res.status(404).json({
        message: 'User not exist!',
        success: false,
        user: [],
      });
      return;
    }

    res.status(200).json({
      user: user,
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

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
    });

    if (!user) {
      res.status(404).json({
        message: "User not exist!",
        success: false,
      });
      return;
    }

    await user.destroy();

    res.status(200).json({
      message: "User successfully deleted!",
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
        .json({ message: "Internal Server Error!", success: false });
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
    res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
      success: false,
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (
      !user ||
      !(await bcrypt.compare(password, user.get("password") as string))
    ) {
      res.status(401).json({
        message: "Invalid credentials!",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        id: user.get("id"),
        name: user.get("name"),
        email: user.get("email"),
        role: user.get("role"),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
      success: false,
    });
  }
};
