import React from 'react';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <Menu role='navigation'
        secondary style={{ 
        height: '6rem', 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 1rem' }}>
      <Menu.Item>
        <Dropdown item simple icon='bars' role='button' aria-label='bars'>
          <Dropdown.Menu>
          <Dropdown.Item role='menuitem' aria-label='characters' as={Link} to="/characters-list">Characters</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
      <Menu.Menu style={{ 
          flexGrow: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
        <Menu.Item role='link' as={Link} to="/"
          aria-label='logo'
          style={{ 
            background: 'none', 
            padding: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'none'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}>
          <Image role='img' aira-label='logo' src='/logo.png' style={{ height: '5rem', width: 'auto' }}/>
        </Menu.Item>
      </Menu.Menu>
      <Menu.Item position='right'>
        <Image role='img'
          aria-label='favicon'
          size='mini' 
          src='/favicon.png' 
          style={{ height: '3rem', width: 'auto' }}
        />
      </Menu.Item>
    </Menu>
  );
}
