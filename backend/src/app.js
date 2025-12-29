import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);

export default app;
