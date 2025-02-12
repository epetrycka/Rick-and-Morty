import React from 'react';
import CharacterCard from '../CharacterCard';
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';

export default function Cards({ characters = [] }) {
  const rows = 4;
  const columns = 5;

  return (
    <Grid style={{ height: '100%'}}>
      {[...Array(rows)].map((_, rowIndex) => (
        <GridRow key={rowIndex} columns={columns}>
          {characters
            .slice(rowIndex * columns, (rowIndex + 1) * columns)
            .map((character, colIndex) => (
              <GridColumn key={colIndex}>
                <CharacterCard character={character} />
              </GridColumn>
            ))}
        </GridRow>
      ))}
    </Grid>
  );
}
