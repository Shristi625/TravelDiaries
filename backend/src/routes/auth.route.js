import { Router } from "express";
import { authRateLimiter } from "../middlewares/rate-limiting.middleware";

const router = Router();

router.route("/sign-up").post(authRateLimiter);

router.route("/login").post();

router.route("/logout").post();

export default router;
