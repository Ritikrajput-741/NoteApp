import { Note } from "../model/noteModel.js";

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, and Content is required",
      });
    }

    const newNote = new Note({ title, content });
    await newNote.save();

    return res.status(201).json({
      success: true,
      message: "Note create successfully✅",
      newNote,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const getNote = await Note.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All notes find😎",
      getNote,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, and Content is required",
      });
    }
    const notes = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true },
    );

    if (!notes) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Notes update successfully✅",
      notes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }
    const notes = await Note.findByIdAndDelete(id);

    if (!notes) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    if (!req.params.id) {
      return res.status(400).json({ message: "ID is required" });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully ✅",
      notes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
