import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import CreateNote from './Components/CreateNote'; 

function App() {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <Routes>
                    <Route path="/" element={<div>Home Page</div>} /> 
                    <Route path="/CreateNote" element={<CreateNote />} /> 
                </Routes>
            </div>
        </Router>
    );
}

export default App;
