import React from 'react';
import CharacterCard from '../CharacterCard';
import { Grid } from 'semantic-ui-react';

export default function Cards({ characters = [] }) {
  if (characters.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Brak postaci do wyświetlenia</p>;
  }

  return (
    <Grid style={{ height: '100%' }} columns={5} stackable>
      {characters.map((character) => (
        <Grid.Column key={character.id}>
          <CharacterCard character={character} />
        </Grid.Column>
      ))}
    </Grid>
  );
}
