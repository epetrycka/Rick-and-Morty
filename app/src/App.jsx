import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';

import Navbar from "./components/Navbar";
import CharactersList from "./routes/CharactersList";
import CharacterInfo from "./routes/CharacterInfo";
import Main from "./routes/main";

export default function App() {
  return (
    <div className="main-container">
      <header className="main-header">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/characters-list" element={<CharactersList />} />
        <Route path="/character-info" element={<CharacterInfo />} />
        <Route path="/character-info/:id" element={<CharacterInfo />} />
      </Routes>
    </div>
  );
}