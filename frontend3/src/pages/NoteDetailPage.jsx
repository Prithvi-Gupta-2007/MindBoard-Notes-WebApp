import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { ArrowLeft, Save } from "lucide-react";

export default function NoteDetailPage({ notes, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const note = notes.find((n) => n._id === id);

  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");

  if (!note) {
    return (
      <div className="min-h-screen bg-[#1a120b]">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="bg-[#3c2a21] border border-[#5c3d2e] rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-[#f5e6dc] mb-2">Note not found</h2>
            <p className="text-[#d2b48c] mb-6">
              This note doesn't exist or may have been deleted.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#6f4e37] hover:bg-[#8b5e3c] text-[#f5e6dc] font-semibold px-5 py-2.5 rounded-2xl transition-all duration-200 hover:scale-105"
            >
              Go back home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    if (!content.trim()) {
      toast.error("Content cannot be empty");
      return;
    }

    onUpdate(id, { title: title.trim(), content: content.trim() });
    toast.success("Note updated successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#1a120b]">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#d2b48c] hover:text-[#f5e6dc] mb-6 text-sm transition-all duration-200 hover:gap-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="bg-[#3c2a21] border border-[#5c3d2e] rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-[#f5e6dc] mb-6">Edit Note</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-semibold text-[#d2b48c]">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title..."
                className="w-full px-4 py-3 bg-[#1a120b] border border-[#5c3d2e] rounded-2xl text-[#f5e6dc] placeholder-[#8b5e3c] focus:outline-none focus:ring-2 focus:ring-[#6f4e37] text-base transition-all duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="content" className="text-sm font-semibold text-[#d2b48c]">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note here..."
                rows={10}
                className="w-full px-4 py-3 bg-[#1a120b] border border-[#5c3d2e] rounded-2xl text-[#f5e6dc] placeholder-[#8b5e3c] focus:outline-none focus:ring-2 focus:ring-[#6f4e37] text-sm leading-relaxed resize-none transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full bg-[#6f4e37] hover:bg-[#8b5e3c] text-[#f5e6dc] font-semibold py-3 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-100"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
