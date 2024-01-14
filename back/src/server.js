import express from "express";
import "dotenv/config.js";
import cors from "cors";
import connectDB from "./utils/connectDB.js";
import errorHandler from "./middleware/errorMiddleware.js";
import notesRouter from "./routes/notesRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 8080;
connectDB();
const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    preflightContinue: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/notetube/note", notesRouter);
app.use("/api/notetube/user", userRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
