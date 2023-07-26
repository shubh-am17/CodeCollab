import './App.css';
import React from 'react';
import {BrowserRouter, Routes,Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
function App() {
  return (
    <>
    {/* check if we can put this outside return */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/editor/:roomId" element={<EditorPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
