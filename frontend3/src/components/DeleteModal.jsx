import { useEffect } from "react";
import { Trash2, X } from "lucide-react";

export default function DeleteModal({ open, onClose, onConfirm, noteTitle }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#3c2a21] border border-[#5c3d2e] rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-900/40 border border-red-800/50 rounded-xl flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-[#f5e6dc] font-semibold text-lg">Delete Note</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#5c3d2e] text-[#d2b48c] hover:text-[#f5e6dc] transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-[#d2b48c] text-sm mb-6 leading-relaxed">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-[#f5e6dc]">"{noteTitle}"</span>?{" "}
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-2xl border border-[#5c3d2e] text-[#d2b48c] font-medium hover:bg-[#5c3d2e] hover:text-[#f5e6dc] transition-all duration-200 hover:scale-105 active:scale-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-2xl bg-red-700 hover:bg-red-600 text-white font-medium transition-all duration-200 hover:scale-105 active:scale-100 hover:shadow-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
