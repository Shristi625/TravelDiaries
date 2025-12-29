import { Router } from "express";
import { apiRateLimiter } from "../middlewares/rate-limiting.middleware";
import authenticate from "../middlewares/authenticate.middleware";
import asyncHandler from "../middlewares/async-handler.middleware";
import {
  createDiaryController,
  getDiaryByIdController,
  getMyDiariesController,
  deleteDiaryController,
  updateDiaryController,
} from "../controllers/travel-diary.controller";
import {
  validateDiaryIdParam,
  validateTravelDiary,
  validateUpdateTravelDiary,
} from "../validators/travel-diary.validator";
import validateRequest from "../middlewares/validate-request.middleware";
import { uploadSingle } from "../middlewares/multer.middleware";

const router = Router();

router
  .route("/")
  .get(
    apiRateLimiter,
    authenticate(["user", "admin"]),
    asyncHandler(getMyDiariesController)
  );

router
  .route("/:id")
  .get(
    apiRateLimiter,
    authenticate(["user", "admin"]),
    validateDiaryIdParam,
    validateRequest,
    asyncHandler(getDiaryByIdController)
  );
router
  .route("/")
  .post(
    apiRateLimiter,
    authenticate(["user", "admin"]),
    uploadSingle("coverImage"),
    validateTravelDiary,
    validateRequest,
    asyncHandler(createDiaryController)
  );

router
  .route("/:id")
  .put(
    apiRateLimiter,
    authenticate(["user", "admin"]),
    uploadSingle("coverImage"),
    validateDiaryIdParam,
    validateUpdateTravelDiary,
    validateRequest,
    asyncHandler(updateDiaryController)
  );
router
  .route("/:id")
  .delete(
    apiRateLimiter,
    authenticate(["user", "admin"]),
    asyncHandler(deleteDiaryController)
  );

export default router;
