import React from 'react';

import 'semantic-ui-css/semantic.min.css';

import CharactersList from '../CharactersList';

export default function Main() {
  return(
    <div className='main-content'>
      <CharactersList />
    </div>
  );
}