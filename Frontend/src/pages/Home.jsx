import React, { useContext } from "react";
import NoteCard from "@/components/NoteCard";
import { NoteContext } from "@/context/NoteContext";

const Home = () => {
  const { notes = [], loading } = useContext(NoteContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  // remove undefined/null notes
  const validNotes = notes.filter(
    (note) => note && note._id && note.title
  );

  if (validNotes.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">No Notes Yet...</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-6">
      {validNotes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
        />
      ))}
    </div>
  );
};

export default Home;