import { body } from "express-validator";

export const validateUserRegistration = [
  body("name")
    .notEmpty()
    .withMessage("Name is required!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long!"),
  body("email")
    .notEmpty()
    .withMessage("Email address is required!")
    .bail()
    .isEmail()
    .withMessage("Invalid email address!"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long!"),
];

export const validateUserLogin = [
  body("email").notEmpty().withMessage("Email address is required!"),
  body("password").notEmpty().withMessage("Password is required!"),
];
