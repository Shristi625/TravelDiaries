import { body } from "express-validator";

export const signUpValidator = [
  body("username").trim().notEmpty().withMessage("Username is required"),

  body("email").isEmail().withMessage("Enter a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  body("privacy")
    .equals("true")
    .withMessage("You must agree to the privacy policy"),
];
