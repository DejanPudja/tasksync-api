import { body } from "express-validator";

export const validateTaskCreation = [
  body("name")
    .notEmpty()
    .withMessage("Task name is required!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Task name must be at least 3 characters long!"),
  body("user_id")
    .notEmpty()
    .withMessage("User ID is required!")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("User ID must be a positive integer!"),
  body("project_id")
    .notEmpty()
    .withMessage("Project ID is required!")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("Project ID must be a positive integer!"),
  body("status")
    .notEmpty()
    .withMessage("Status is required!")
    .bail()
    .isIn([
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
      "completed",
    ])
    .withMessage("Invalid status value!"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array!"),
  body("estimated_time")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Estimated time must be a positive integer (in seconds)!"),
  body("tracked_time")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Tracked time must be a positive integer (in seconds)!"),
  body("due_date")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date!"),
  body("type")
    .optional()
    .isIn(["epic", "story", "task", "bug", "milestone"])
    .withMessage("Invalid task type!"),
  body("priority")
    .optional()
    .isIn(["low", "normal", "high", "urgent"])
    .withMessage("Invalid priority value!"),
  body("release")
    .optional()
    .isIn([
      "local",
      "develop",
      "staging",
      "live",
      "non-release",
      "beta env.",
    ])
    .withMessage("Invalid release value!"),
];
