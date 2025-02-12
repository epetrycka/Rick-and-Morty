import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function CharacterCard({ character }) {
  if (!character) return null;

  return (
    <Card style={{
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '1rem',
      width: '100%',
      maxWidth: '500px',
      height: '100%',
      maxHeight: '105px'
    }} as={Link} to="/character-info" state={{character}}
    >
      <Image 
        src={character.image} 
        alt={character.name} 
        size="tiny"
        style={{
          borderRadius: '10px',
          objectFit: 'cover',
          marginRight: '0.5rem'
        }}
      />
    
      <Card.Content style={{
        flex: 1, 
        border: 'none', 
        padding: '0.5rem',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <Card.Header style={{
          fontSize: 'clamp(0.6rem, 1.5vw, 1rem)',
          lineHeight: '2',
          whiteSpace: 'nowrap', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis'
        }}>
          {character.name}
        </Card.Header>
        
        <Card.Meta style={{
          fontSize: 'clamp(0.5rem, 1vw, 0.9rem)',
          lineHeight: '1',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          <span>{character.status} - {character.species}</span>
        </Card.Meta>
    
        <Card.Description style={{
          fontSize: 'clamp(0.5rem, 1vw, 0.9rem)',
          lineHeight: '1',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          Gender: {character.gender}
        </Card.Description>
      </Card.Content>
    </Card>    
  );
}
