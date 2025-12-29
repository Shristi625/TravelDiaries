import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.route.js";
import { globalRateLimiter } from "./middlewares/rate-limiting.middleware.js";
import globalErrorHandler from "./middlewares/global-error-handler.middleware.js";
import passport from "./config/passport.config.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(globalRateLimiter);
app.use(routes);
app.use(passport.initialize());
app.use(globalErrorHandler);

export default app;
