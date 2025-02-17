import 'semantic-ui-css/semantic.min.css';
import './CharacterInfo.css';
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import InfoTable from '../../components/InfoTable';
import EpisodesTable from '../../components/EpisodesTable';
import { Image, Button } from 'semantic-ui-react';
import axios from 'axios';

export default function CharacterInfo() {
  const { id } = useParams();
  const location = useLocation();
  const [character, setCharacter] = useState(location.state?.character || null);
  const [showEpisodes, setShowEpisodes] = useState(false);
  
   useEffect(() => {
    if (!character) {
      if (!character) {
        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
          .then(response => setCharacter(response.data))
          .catch(error => console.error("Error fetching character:", error));
      }
    }
  }, [id, character]);

  if (!character) return <p>Brak danych postaci...</p>;

  const characterEpisodes = character.episode.map(url => parseInt(url.split('/').pop()));

  return (
      <div className="info-container">
        <header className="section nav"></header>
        <div className="section info-content">
          <aside className="section sidebarInfo"></aside>
          <main className="section contentInfo">
            <div className="leftColumn">
              <InfoTable character={character} />
            </div>
            <div className="rightColumn">
              <div className="image-container">
                <Image src={character.image} alt={character.name} size="small" />
                <Button 
                  role="button"
                  size="mini"
                  basic 
                  style={{ margin: '1px' }} 
                  onClick={() => setShowEpisodes(prev => !prev)}
                >
                  {showEpisodes ? "Hide Episodes" : "Show Episodes"}
                </Button>
                {showEpisodes && <EpisodesTable characterEpisodes={characterEpisodes} />}
              </div>
            </div>
          </main>
          <aside className="section sidebarInfo"></aside>
        </div>
        <footer className="footer"></footer>
      </div>
  );
}
