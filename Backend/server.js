import express from "express";
import "dotenv/config";
import { connectDB } from "./database/db.js";
import noteRouter from "./routes/noteRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/notes", noteRouter);

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at localhost: ${PORT}`);
  });
});
