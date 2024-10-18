import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Components/Sidebar';
import CreateNote from './Components/CreateNote';
import DisplayNote from './Components/DisplayNote';

interface Note {
  _id: string;
  title: string;
  description: string;
  category: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get<Note[]>("http://localhost:3110/api/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  setTimeout(fetchNotes,500)

  const addNote = (newNote: Note) => {
    setNotes(prevNotes => [...prevNotes, newNote]);
  };

  return (
    <Router>
      <div className="flex">
        <Sidebar notes={notes} />
        <Routes>
          <Route path="/" element={<div className='flex justify-center pt-[100px]  h-[100vh] w-full bg-gray-800'>
            <h1 className='text-5xl text-[#009378] font-mono font-semibold'>Click on create note to get started!</h1>
          </div>} />
          <Route path="/CreateNote" element={<CreateNote addNote={addNote} />} />
          {notes.map(note => (
            <Route
              key={note._id}
              path={`/note/${note.title}`}
              element={<DisplayNote note={note} />}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;