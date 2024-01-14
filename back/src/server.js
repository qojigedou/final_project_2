import express from "express";
import "dotenv/config.js";
import cors from "cors";
import connectDB from "./utils/connectDB.js";
const {errorHandler} = require("../middleware/errorMiddleware.js")
const port = process.env.PORT || 8080;
connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/notetube', require('./routes/notesRoutes'))
app.use(errorHandler)   
app.use(
    cors({
        credentials:  true,
        origin: "http://localhost:5173/",
        preflightContinue: true,
    })
)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});