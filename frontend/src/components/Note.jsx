import React from "react";

export default function Note({ note, onDelete }) {
  // Format date for display
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  return (
    <div className="note-container border p-4 rounded shadow-sm bg-white">
      {/* Note Title */}
      <p className="note-title font-bold text-lg">{note.title}</p>

      {/* Note Content */}
      <p className="note-content text-gray-700 mt-2">{note.content}</p>

      {/* Created Date */}
      <p className="note-date text-sm text-gray-500 mt-2">{formattedDate}</p>

      {/* Delete Button */}
      <button
        className="delete-button mt-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => onDelete(note.id)}
      >
        Delete
      </button>
    </div>
  );
}
