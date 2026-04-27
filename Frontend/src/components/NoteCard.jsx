import { NoteContext } from "@/context/NoteContext";
import { useContext, useState } from "react";

const NoteCard = ({ note }) => {
  if (!note) return null;

  const { deleteNotes, updateNotes } = useContext(NoteContext);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleUpdate = async () => {
    if (!title || !content) return;
    await updateNotes({ title, content }, note._id);
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 text-black">
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-1 mb-2 text-sm "
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded p-1 mb-2 text-sm"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="text-sm px-3 py-1 bg-blue-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-sm px-3 py-1 border rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-base">{note.title}</h3>
            <div className="flex gap-2">
              {/* Edit icon */}
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-blue-500"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>

              {/* Delete icon */}
              <button
                onClick={() => deleteNotes(note._id)}
                className="text-gray-400 hover:text-red-500"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M9 6V4h6v2" />
                </svg>
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-3">{note.content}</p>
          <p className="text-xs text-gray-300">
            {new Date(note.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </>
      )}
    </div>
  );
};

export default NoteCard;
