import React from 'react';
import { Segment } from 'semantic-ui-react';

export default function EpisodesTable({ characterEpisodes }) {
  const episodes = Array.from({ length: 51 }, (_, i) => i + 1);

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(10, min-content)', 
      gap: '2px'
    }}>
      {episodes.map((ep) => {
        const isPlayed = characterEpisodes.includes(ep);
      
        return (
          <Segment 
            key={ep} 
            textAlign="center" 
            style={{ 
              padding: '1px', 
              margin: 0, 
              fontSize: '0.8rem', 
              minWidth: '25px', 
              minHeight: '24px', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isPlayed ? '#87CEEB' : 'transparent',
              border: isPlayed ? '0.5px solid #4682B4' : 'none',
              borderRadius: '5px',
              fontWeight: isPlayed ? 'bold' : 'normal',
              opacity: isPlayed ? 1 : 0.6,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {ep}
          </Segment>
        );
      })}
    </div>
  );
}
