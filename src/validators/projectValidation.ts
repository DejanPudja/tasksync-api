import { body } from "express-validator";

export const validateCreateProject = [
  body("name")
    .notEmpty()
    .withMessage("Name is required!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long!"),
  body("user_id")
    .notEmpty()
    .withMessage("User ID is required!")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("User ID must be a positive integer!"),
  body("status")
    .isIn(["active", "complete"])
    .withMessage("Status must be either 'active' or 'complete'!"),
];

export const validateUpdateProject = [
  body("status")
    .optional()
    .isIn(["active", "complete"])
    .withMessage("Status must be either 'active' or 'complete'!"),
];
