import { Router } from "express";
import NoteController from "../controllers/NoteController.js";
import { checkAuth, checkRoles } from "../middlewares/checkAuth.js";

const routerNote = Router();

routerNote.get("/", NoteController.getNotes);

routerNote.post("/", NoteController.createNote);

routerNote.put("/update/:note_id", NoteController.updateNote);

routerNote.use('/', checkAuth,  checkRoles(['admin']))
routerNote.delete("/delete/:note_id", NoteController.deleteNote);

export default routerNote;
