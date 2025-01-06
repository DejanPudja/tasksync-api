import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import { log } from "console";

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
