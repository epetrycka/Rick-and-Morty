import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CharactersList from "./routes/CharactersList";
import CharacterInfo from "./routes/CharacterInfo";
import Main from "./routes/main";
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="container2">
          <header className="header2">
            <Navbar />
          </header>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/characters-list" element={<CharactersList />} />
            <Route path="/character-info" element={<CharacterInfo />} />
          </Routes>
      </div>
    </Router>
  );
}
