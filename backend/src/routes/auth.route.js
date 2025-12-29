import { Router } from "express";
import { authRateLimiter } from "../middlewares/rate-limiting.middleware.js";
import {
  signUpValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import validateRequest from "../middlewares/validate-request.middleware.js";
import asyncHandler from "../middlewares/async-handler.middleware.js";
import {
  signUpController,
  loginController,
} from "../controllers/auth.controller.js";

const router = Router();

router
  .route("/sign-up")
  .post(
    authRateLimiter,
    signUpValidator,
    validateRequest,
    asyncHandler(signUpController)
  );

router
  .route("/login")
  .post(
    authRateLimiter,
    loginValidator,
    validateRequest,
    asyncHandler(loginController)
  );

// router.route("/logout").post();

export default router;
