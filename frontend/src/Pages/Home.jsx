import { useState, useEffect } from "react";
import API from "../api";
import Note from "../components/Note"; // ✅ Reusable note component
import "../styles/home.css"; // ✅ Styling for layout
import LoadingIndicator from "../components/LoadingIndicator";


export default function Home() {
  // ----------------------------
  // STATE VARIABLES
  // ----------------------------
  const [notes, setNotes] = useState([]);       // Stores all notes
  const [title, setTitle] = useState("");       // New note title
  const [content, setContent] = useState("");   // New note content
  const [loading, setLoading] = useState(false); // Loading state

  // ----------------------------
  // FETCH NOTES (GET)
  // ----------------------------
  const getNotes = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/notes/"); // Django endpoint
      setNotes(res.data);
    } catch (err) {
      alert("Error fetching notes: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load notes when the page first loads
  useEffect(() => {
    getNotes();
  }, []);

  // ----------------------------
  // CREATE NOTE (POST)
  // ----------------------------
  const createNote = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      setLoading(true);
      const res = await API.post("/api/notes/", {
        title,
        content,
      });

      if (res.status === 201) {
        alert("Note created successfully!");
        setTitle("");    // Clear form
        setContent("");
        getNotes();      // Refresh notes list
      } else {
        alert("Failed to create note.");
      }
    } catch (err) {
      alert("Error creating note: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // DELETE NOTE (DELETE)
  // ----------------------------
  const deleteNote = async (id) => {
    try {
      setLoading(true);
      const res = await API.delete(`/api/notes/delete/${id}/`);

      if (res.status === 204) {
        alert("Note deleted successfully!");
        getNotes(); // Refresh list after deletion
      } else {
        alert("Failed to delete note.");
      }
    } catch (err) {
      alert("Error deleting note: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // UI (JSX)
  // ----------------------------
  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 text-center">Notes App</h1>

      {/* Loading Indicator */}
      {loading && <LoadingIndicator />}

      {/* Notes List */}
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
      <div className="space-y-4 mb-8">
        {notes.length === 0 ? (
          <p className="text-gray-500">No notes yet. Create one!</p>
        ) : (
          notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onDelete={deleteNote}
            />
          ))
        )}
      </div>

      {/* Create Note Form */}
      <form
        onSubmit={createNote}
        className="space-y-4 border p-4 rounded-lg shadow bg-white"
      >
        <h3 className="text-xl font-semibold">Create a New Note</h3>

        {/* Title Field */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        {/* Content Field */}
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full border p-2 rounded h-24"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
