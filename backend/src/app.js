import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.route.js";
import { globalRateLimiter } from "./middlewares/rate-limiting.middleware.js";
import globalErrorHandler from "./middlewares/global-error-handler.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(globalRateLimiter);
app.use(routes);
app.use(globalErrorHandler);

export default app;
