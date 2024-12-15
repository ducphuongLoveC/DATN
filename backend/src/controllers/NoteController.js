import Note from "../models/Note.js";
class NoteController {
  async getNotes(req, res) {
    const { resource_id, user_id, type, sort } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    let query = { user_id };
    if (type === "all_chapters") {
    } else if (type === "in_chapter" && resource_id) {
      query.resource_id = resource_id;
    } else {
      return res.status(400).json({ message: "Invalid type parameter" });
    }

    try {
      let sortCriteria = {};
      if (sort === "ASC") {
        sortCriteria.createdAt = 1;
      } else if (sort === "DESC") {
        sortCriteria.createdAt = -1;
      }
      const notes = await Note.find(query).sort(sortCriteria);

      if (notes.length === 0) {
        return res.status(404).json({
          message: "No notes found for the given user ID and resource ID",
        });
      }

      return res.status(200).json({ notes });
    } catch (error) {
      console.error("Error fetching notes:", error);
      return res.status(500).json({ message: "Failed to fetch notes" });
    }
  }

  async createNote(req, res) {
    const { resource_id, user_id, title, content, markAt } = req.body;

    if (!resource_id || !user_id || !title || !content || !markAt) {
      return res.status(400).json({ message: "Tất cả trường đều bắt buộc" });
    }

    try {
      const newNote = new Note({
        resource_id,
        user_id,
        title,
        content,
        markAt,
      });

      await newNote.save();

      return res
        .status(201)
        .json({ message: "Note created successfully", note: newNote });
    } catch (error) {
      console.error("Error creating note:", error);
      return res.status(500).json({ message: "Failed to create note" });
    }
  }

  async updateNote(req, res) {
    const { note_id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content không được để trống" });
    }

    try {
      const updatedNote = await Note.findByIdAndUpdate(
        note_id,
        { content },
        { new: true }
      );

      if (!updatedNote) {
        return res.status(404).json({ message: "Note not found" });
      }

      return res
        .status(200)
        .json({ message: "Note updated successfully", note: updatedNote });
    } catch (error) {
      console.error("Error updating note:", error);
      return res.status(500).json({ message: "Failed to update note" });
    }
  }

  async deleteNote(req, res) {
    const { note_id } = req.params;

    try {
      const deletedNote = await Note.findByIdAndDelete(note_id);

      if (!deletedNote) {
        return res.status(404).json({ message: "Note not found" });
      }

      return res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
      console.error("Error deleting note:", error);
      return res.status(500).json({ message: "Failed to delete note" });
    }
  }
}

export default new NoteController();
