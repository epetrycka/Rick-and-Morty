import 'semantic-ui-css/semantic.min.css';
import './CharacterInfo.css';
import React, { useState } from 'react';
import InfoTable from '../../components/InfoTable';
import EpisodesTable from '../../components/EpisodesTable';
import { Image, Button } from 'semantic-ui-react';
import { useLocation } from "react-router-dom";

export default function CharacterInfo() {
  const location = useLocation();
  const character = location.state?.character;
  const [showEpisodes, setShowEpisodes] = useState(false);

  if (!character) return <p>Brak danych postaci</p>;

  const characterEpisodes = character.episode.map(url => parseInt(url.split('/').pop()));

  return (
      <>
        <div className="info-container">
          <header className="section nav"></header>
          <div className="section main-content">
            <aside className="section sidebarInfo"></aside>
            <main className="section contentInfo">
              <div className="leftColumn">
                <InfoTable character={character}/>
              </div>
              <div className="rightColumn">
                <div className="image-container">
                  <Image src={character.image} alt={character.name} size="small" />
                  <Button 
                    size='mini'
                    content={showEpisodes ? "Hide Episodes" : "Show Episodes"} 
                    basic 
                    style={{ margin: '1px' }} 
                    onClick={() => setShowEpisodes(prev => !prev)}
                  />
                  {showEpisodes && <EpisodesTable characterEpisodes={characterEpisodes} />}
                </div>
              </div>
            </main>
            <aside className="section sidebarInfo"></aside>
          </div>
          <footer className="footer"></footer>
        </div>
      </>
  );
}
