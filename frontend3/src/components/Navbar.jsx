import { Link } from "react-router-dom";
import { Plus, BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#1a120b]/95 backdrop-blur-sm border-b border-[#5c3d2e] shadow-lg">
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-[#f5e6dc] hover:text-white transition-colors duration-200"
          >
            <BookOpen className="w-6 h-6 text-[#d2b48c]" />
            <span className="text-xl font-bold tracking-tight">MindBoard</span>
          </Link>
          <Link
            to="/create"
            className="flex items-center gap-2 bg-[#6f4e37] hover:bg-[#8b5e3c] text-[#f5e6dc] font-semibold px-4 py-2 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-100"
          >
            <Plus className="w-4 h-4" />
            <span>New Note</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
