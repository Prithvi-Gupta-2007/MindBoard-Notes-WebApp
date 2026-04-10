import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";

function App() {
  const [notes, setNotes] = useState([]);

  const BASE_URL = "http://localhost:5001/api/notes";

  // ✅ FETCH FUNCTION (reusable)
 const fetchNotes = async () => {
  try {
    const res = await fetch("http://localhost:5001/api/notes");
    const data = await res.json();

    console.log("FETCHED DATA:", data); // 👈 ADD THIS

    setNotes(data);
  } catch (err) {
    console.log(err);
  }
};

  // 🔥 INITIAL LOAD
  useEffect(() => {
    fetchNotes();
  }, []);

  // 🔥 CREATE NOTE (FIXED)
  const createNote = async (note) => {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      await res.json();

      fetchNotes(); // 🔥 THIS FIXES YOUR ISSUE
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 UPDATE NOTE (FIXED)
  const updateNote = async (id, updated) => {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated),
      });

      fetchNotes(); // 🔥 keep UI consistent
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 DELETE NOTE (FIXED)
  const deleteNote = async (id) => {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      fetchNotes(); // 🔥 sync after delete
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#3c2a21",
            color: "#f5e6dc",
            border: "1px solid #5c3d2e",
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />

      <Routes>
        <Route
          path="/"
          element={<HomePage notes={notes} onDelete={deleteNote} />}
        />
        <Route
          path="/create"
          element={<CreatePage onCreate={createNote} />}
        />
        <Route
          path="/note/:id"
          element={
            <NoteDetailPage notes={notes} onUpdate={updateNote} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;