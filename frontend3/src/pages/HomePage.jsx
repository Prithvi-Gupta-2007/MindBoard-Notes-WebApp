import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { NotebookPen, Plus, Search } from "lucide-react";

export default function HomePage({ notes, onDelete }) {
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    onDelete(id);
    toast.success("Note deleted successfully");
  };

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#1a120b]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#f5e6dc] mb-1">Your Notes</h1>
            <p className="text-[#d2b48c] text-sm">
              {notes.length === 0
                ? "No notes created yet"
                : `${notes.length} note${notes.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b5e3c]" />
            <input
              type="search"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#3c2a21] border border-[#5c3d2e] rounded-2xl text-sm text-[#f5e6dc] placeholder-[#8b5e3c] focus:outline-none focus:ring-2 focus:ring-[#6f4e37] transition-all duration-200"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-20 h-20 bg-[#3c2a21] border border-[#5c3d2e] rounded-2xl flex items-center justify-center mb-5">
              <NotebookPen className="w-10 h-10 text-[#8b5e3c]" />
            </div>
            <p className="text-xl font-semibold text-[#f5e6dc] mb-2">
              {search ? "No notes match your search" : "No notes created"}
            </p>
            <p className="text-[#d2b48c] text-sm mb-6">
              {search ? "Try a different search term" : "Start capturing your thoughts"}
            </p>
            {!search && (
              <Link
                to="/create"
                className="flex items-center gap-2 bg-[#6f4e37] hover:bg-[#8b5e3c] text-[#f5e6dc] font-semibold px-5 py-2.5 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Create Note
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((note) => (
              <NoteCard key={note._id} note={note} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
