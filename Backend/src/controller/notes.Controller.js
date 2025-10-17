import Note from "../model/Note.js";

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json(notes, { success: true, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to retrieve notes", error: error.message });
  }
};



// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required" });
    }

    const newNote = new Note({ title, content });
    await newNote.save();

    res.status(201).json({ success: true, message: "Note created successfully", data: newNote });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create note", error: error.message });
  }
};



// Update a note
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, message: "Note updated successfully", data: updatedNote });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update note", error: error.message });
  }
};



// Delete a note
export const deleteNotes = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ success: false, message: "Note not found to delete" });
    }

    res.status(200).json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete note", error: error.message });
  }
};



// Get note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get note", error: error.message });
  }
};


