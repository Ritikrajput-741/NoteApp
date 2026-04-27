import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";

export const NoteContext = createContext();

export const useNotes = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {

  // const baseUrl = "http://localhost:4001";
  const baseUrl = "https://noteapp-y9az.onrender.com";

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ GET NOTES
  const getNotes = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${baseUrl}/api/v1/notes/get-note`,
      );

      if (res.data.success) {
        // ✅ supports getNote safely
        const data = res.data.getNote;

        setNotes(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Failed to fetch notes",
      );
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  // ✅ CREATE NOTE
  const createNotes = async (note) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${baseUrl}/api/v1/notes/create-note`,
        note,
      );

      if (res.data.success) {
        const newNote = res.data.newNote;

        if (newNote && newNote._id) {
          setNotes((prev) => [newNote, ...prev]);
        }
      }
    } catch (error) {
      setError("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATE NOTE
  const updateNotes = async (updatedNote, id) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${baseUrl}/api/v1/notes/update-note/${id}`,
        updatedNote,
      );

      if (res.data.success) {
        const updated = res.data.updatedNote;

        setNotes((prev) =>
          prev.map((note) => (note?._id === id ? updated : note)),
        );
      }
    } catch (error) {
      setError("Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE NOTE
  const deleteNotes = async (id) => {
    try {
      setLoading(true);

      const res = await axios.delete(
        `${baseUrl}/api/v1/notes/delete-note/${id}`,
      );

      if (res.data.success) {
        setNotes((prev) => prev.filter((note) => note?._id !== id));
      }
    } catch (error) {
      setError("Failed to delete note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        error,
        createNotes,
        updateNotes,
        deleteNotes,
        getNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
