import jwt from "jsonwebtoken";
import cloudinaryConfig from "../config/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
export class APIError extends Error {
  constructor(statusCode, message, error, stack) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const successResponse = (
  res,
  statusCode = 200,
  message = "Success",
  data = {}
) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};

export const cookie = {
  getOptions() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 12 * 60 * 60 * 1000,
    };
  },
  setCookie(res, name, value, options) {
    res.cookie(name, value, { ...this.getOptions(), ...options });
  },
  getCookie(req, name) {
    return req.cookies[name];
  },
  clearCookie(res, name) {
    res.clearCookie(name, this.getOptions());
  },
};

export const uploadToCloudinary = async (fileBuffer, folder) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(new Error("Cloudinary upload failed"));
          } else {
            const url = cloudinary.url(result.public_id, {
              transformation: [
                { quality: "auto", fetch_format: "webp" },
                { width: 500, height: 500 },
              ],
            });
            resolve({ public_id: result.public_id, url });
          }
        }
      );

      uploadStream.end(fileBuffer);
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Cloudinary upload failed");
  }
};
