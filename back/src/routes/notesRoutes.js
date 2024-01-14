import express from "express";
const router = express.Router();
import {
  getNotes,
  setNote,
  updateNote,
  deleteNote,
  setNewNote,
  deleteFullNote,
} from "../controllers/noteController.js";
import noteAuth from "../middleware/notAuthUserMiddleware.js";

router.post("/", noteAuth, setNote);
router.get("/mynotes", noteAuth, getNotes);
router.post("/mynotes/newnote/:id", noteAuth, setNewNote);
router.put("/mynotes/newnote/:mainId/:childId", noteAuth, updateNote);

router.delete("/mynotes/newnote/:mainId/:childId", noteAuth, deleteNote);

router.delete("/mynotes/newnote/:mainId", noteAuth, deleteFullNote);

export default router;
