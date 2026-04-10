import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import DeleteModal from "./DeleteModal";

function formatDate(dateStr) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return "";
  }
}

export default function NoteCard({ note, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    if (e.target.closest("button")) return;
    navigate(`/note/${note._id}`);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group relative bg-[#3c2a21] border border-[#5c3d2e] rounded-2xl p-5 shadow-md cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:border-[#8b5e3c] flex flex-col gap-3"
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[#f5e6dc] font-semibold text-base leading-snug line-clamp-1 flex-1">
            {note.title}
          </h3>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/note/${note._id}`); }}
              className="p-1.5 rounded-lg hover:bg-[#6f4e37] text-[#d2b48c] hover:text-[#f5e6dc] transition-all duration-200 hover:scale-110"
              title="Edit"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
              className="p-1.5 rounded-lg hover:bg-red-900/50 text-[#d2b48c] hover:text-red-400 transition-all duration-200 hover:scale-110"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-[#d2b48c] text-sm leading-relaxed line-clamp-3 flex-1">
          {note.content || <span className="italic opacity-50">No content</span>}
        </p>

        <p className="text-[#8b5e3c] text-xs font-medium">{formatDate(note.createdAt)}</p>
      </div>

      <DeleteModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          onDelete(note._id);
          setShowModal(false);
        }}
        noteTitle={note.title}
      />
    </>
  );
}
