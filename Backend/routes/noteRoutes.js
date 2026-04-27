import express from "express";
import {
  createNote,
  deleteNotes,
  getAllNotes,
  updateNotes,
} from "../controllers/noteController.js";

const router = express.Router();

router.post("/create-note", createNote);
router.get("/get-note", getAllNotes);
router.put("/update-note/:id", updateNotes);
router.delete("/delete-note/:id", deleteNotes);

export default router;
