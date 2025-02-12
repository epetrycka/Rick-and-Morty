import React from 'react';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <Menu secondary style={{ 
        height: '6rem', 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 1rem' }}>
      <Menu.Item>
        <Dropdown item simple icon='bars'>
          <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/characters-list">Characters</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
      <Menu.Menu style={{ 
          flexGrow: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
        <Menu.Item >
          <Image src='/logo.png' style={{ height: '5rem', width: 'auto' }} />
        </Menu.Item>
      </Menu.Menu>
      <Menu.Item position='right'>
        <Image 
          size='mini' 
          src='/favicon.png' 
          style={{ height: '3rem', width: 'auto' }}
        />
      </Menu.Item>
    </Menu>
  );
}
