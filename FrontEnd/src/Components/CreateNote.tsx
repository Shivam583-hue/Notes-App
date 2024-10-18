import React, { useState } from 'react';
import axios from 'axios';


interface Note {
  _id: string;
  title: string;
  description: string;
  category: string;
}

interface CreateNoteProps {
  addNote: (note: Note) => void;
}

function CreateNote({ addNote }: CreateNoteProps) {
  const [n, setN] = useState({ title: '', category: '', description: '' });

  async function clickHandler() {
    if (!n.title || !n.category || !n.description) {
      console.log("Please fill in all fields before creating a note.");
      return;
    }

    try {
      const response = await axios.post<Note>('http://localhost:3110/api/notes', n);
      addNote(response.data);
      setN({ title: '', category: '', description: '' });
    } catch (e: any) {
      console.log("Error: ", e.response ? e.response.data : e.message);
    }
  }

    return (
        <div className='flex pl-[150px] pt-[42px] bg-[#0ac6a3]'>
            <div style={{ width: '1086px' }}>
                <div style={{ height: '700px', width: '900px' }} className='rounded-3xl bg-gray-800'>
                    <div className='pl-5 pt-5'>
                        <h1 className='font-sans text-gray-300 text-3xl font-bold pb-2'>Category of Note</h1>
                        <input 
                            style={{ width: '850px', height: '50px' }} 
                            type="text" 
                            placeholder="Enter Category..." 
                            className="font-mono px-4 py-2 text-[#afb0b0] placeholder-gray-400 bg-gray-800 border-4 border-gray-400 rounded-md focus:outline-none focus:ring-[1.2px] focus:ring-gray-400 focus:border-gray-400"
                            value={n.category}
                            onChange={(e) => setN({ ...n, category: e.target.value })}
                        />
                    </div>
                    <div className='pl-5 pt-5'>
                        <h1 className='font-sans text-gray-300 text-3xl font-bold pb-2'>Title of Note</h1>
                        <input 
                            style={{ width: '850px', height: '50px' }} 
                            type="text" 
                            placeholder="Enter Title..." 
                            className="font-mono px-4 py-2 text-[#afb0b0] placeholder-gray-400 bg-gray-800 border-4 border-gray-400 rounded-md focus:outline-none focus:ring-[1.2px] focus:ring-gray-400 focus:border-gray-400"
                            value={n.title}
                            onChange={(e) => setN({ ...n, title: e.target.value })}
                        />
                    </div>
                    <div className='pl-5 pt-5'>
                        <h1 className='font-sans text-gray-300 text-3xl font-bold pb-2'>Note</h1>
                        <textarea 
                            style={{ width: '850px', height: '340px' }} 
                            placeholder="Enter Note..." 
                            className="font-mono px-4 py-2 text-[#afb0b0] placeholder-gray-400 bg-gray-800 border-4 border-gray-400 rounded-md focus:outline-none focus:ring-[1.2px] focus:ring-gray-400 focus:border-gray-400"
                            value={n.description}
                            onChange={(e) => setN({ ...n, description: e.target.value })}
                        />
                    </div>
                    <div className='pl-[760px] pt-3'>
                        <button 
                            onClick={clickHandler} 
                            className={`font-mono text-white font-bold text-[20px] w-[110px] h-[35px] rounded-lg hover:bg-[#7e6356] bg-[#9B7A6A] ${!n.title || !n.category || !n.description ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!n.title || !n.category || !n.description}
                        >
                            ✎Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateNote;
