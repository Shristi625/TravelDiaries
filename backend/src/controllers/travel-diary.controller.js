import TravelDiary from "../models/travel-diary.model.js";
import {
  successResponse,
  APIError,
  uploadToCloudinary,
} from "../utils/index.util.js";

export const createDiaryController = async (req, res, next) => {
  try {
    const { title, location, travelDate, story } = req.body;
    const { coverImage } = req.file;

    const uploadImage = await uploadToCloudinary(
      coverImage.path,
      "travel-diaries"
    );

    const date = new Date(travelDate);
    if (isNaN(date.getTime())) {
      return next(new APIError(400, "Invalid travel date"));
    }
    const newDiary = await TravelDiary.create({
      userId: req.user.userId,
      title,
      location,
      travelDate: date,
      story,
      coverImage: uploadImage.url,
    });

    successResponse(res, 201, "Diary created successfully", newDiary);
  } catch (err) {
    next(err);
  }
};

export const getMyDiariesController = async (req, res, next) => {
  try {
    let diaries;
    if (req.user.role === "admin") {
      diaries = await TravelDiary.find();
    } else {
      diaries = await TravelDiary.find({ userId: req.user.userId });
    }

    successResponse(res, 200, "Diaries fetched successfully", diaries);
  } catch (err) {
    next(err);
  }
};

export const getDiaryByIdController = async (req, res, next) => {
  try {
    const diary = await TravelDiary.findById(req.params.id);
    if (!diary) return next(new APIError(404, "Diary not found"));

    if (
      req.user.role !== "admin" &&
      diary.userId.toString() !== req.user.userId
    )
      return next(new APIError(403, "Access denied"));

    successResponse(res, 200, "Diary fetched successfully", diary);
  } catch (err) {
    next(err);
  }
};

export const updateDiaryController = async (req, res, next) => {
  try {
    const diary = await TravelDiary.findById(req.params.id);
    if (!diary) return next(new APIError(404, "Diary not found"));

    if (
      req.user.role !== "admin" &&
      diary.userId.toString() !== req.user.userId
    )
      return next(new APIError(403, "Access denied"));

    Object.assign(diary, req.body);
    await diary.save();

    successResponse(res, 200, "Diary updated successfully", diary);
  } catch (err) {
    next(err);
  }
};

export const deleteDiaryController = async (req, res, next) => {
  try {
    const diary = await TravelDiary.findById(req.params.id);
    if (!diary) return next(new APIError(404, "Diary not found"));

    if (
      req.user.role !== "admin" &&
      diary.userId.toString() !== req.user.userId
    )
      return next(new APIError(403, "Access denied"));

    await diary.remove();
    successResponse(res, 200, "Diary deleted successfully");
  } catch (err) {
    next(err);
  }
};
