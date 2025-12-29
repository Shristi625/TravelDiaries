import { body } from "express-validator";

export const signUpValidator = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),

  body("email").isEmail().withMessage("Enter a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be either 'user' or 'admin'"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  body("privacy")
    .equals("true")
    .withMessage("You must agree to the privacy policy"),
  body("travelTips")
    .isBoolean()
    .default(false)
    .withMessage("Travel tips must be a boolean value"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Enter a valid email"),

  body("password").notEmpty().withMessage("Password is required"),
];
