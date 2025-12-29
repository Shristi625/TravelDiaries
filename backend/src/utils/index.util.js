import jwt from "jsonwebtoken";

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
