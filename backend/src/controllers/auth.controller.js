import User from "../models/user.model";
import {
  APIError,
  cookie,
  generateToken,
  successResponse,
} from "../utils/index.util";

export const signUpController = async (req, res, next) => {
  const { fullName, email, password, role, privacy, travelTips } = req.body;
  console.log(req.body);

  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    return next(new APIError(409, "User already exists"));
  }

  const newUser = await User.create({
    fullName,
    email,
    password,
    role,
    privacy,
    travelTips,
  });

  const token = generateToken({
    userId: newUser._id,
    role: newUser.role,
  });

  cookie.setCookie(res, "token", token);

  successResponse(res, 201, "User registered successfully", {
    userId: newUser._id,
    email: newUser.email,
  });
};

export const loginController = async (req, res, next) => {};
