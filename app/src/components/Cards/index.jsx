import React from 'react';
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';

import CharacterCard from '../CharacterCard';

export default function Cards({ characters = [] }) {
  if (characters.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Brak postaci do wyświetlenia</p>;
  }
  const rows = 4;
  const columns = 5;

  return (
    <Grid 
      style={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        flexGrow: 1 
      }} 
      role='grid'
    >
      {[...Array(rows)].map((_, rowIndex) => (
        <GridRow 
          key={rowIndex} 
          columns={columns} 
          role="row"
          style={{ flexGrow: 1 }}
        >
          {characters
            .slice(rowIndex * columns, (rowIndex + 1) * columns)
            .map((character, colIndex) => (
              <GridColumn key={colIndex} role="gridcell">
                <CharacterCard character={character} />
              </GridColumn>
            ))}
        </GridRow>
      ))}
    </Grid>
  );
}
