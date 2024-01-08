import express from "express";
import "dotenv/config.js";
import cors from "cors";
import connectDB from "./utils/connectDB.js";

const port = process.env.PORT || 8080;
connectDB()
const app = express()

app.use(express.json())
app.use(
    cors({
        credentials:  true,
        origin: "http://localhost:5173/",
        preflightContinue: true,
    })
)

app.listen(port, () => {
    console.log(`mimimumu on port ${port}`);
});