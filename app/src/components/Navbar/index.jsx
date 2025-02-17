import React from 'react';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <Menu secondary 
      role='navigation'
      style={{ 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 1rem' 
        }}>

      <Menu.Item position='left'>
        <Dropdown item simple 
          icon='bars' 
          role='button' 
          aria-label='bars'>
          <Dropdown.Menu>
            <Dropdown.Item 
              role='menuitem' 
              aria-label='characters' 
              as={Link} to="/characters-list">Characters
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>

      <Menu.Menu 
        style={{
          flexGrow: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
        <Menu.Item 
          role='link' 
          aria-label='logo'
          style={{
            padding: 0
          }}
          as={Link} to="/"
          onMouseEnter={e => e.currentTarget.style.background = 'none'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}>
          <Image src='/logo.png'
          role='img' 
          aira-label='logo' 
          style={{ 
            height: '5rem', 
            width: 'auto' 
          }}/>
        </Menu.Item>
      </Menu.Menu>

      <Menu.Item position='right'>
        <Image src='/favicon.png' 
          role='img'
          aria-label='favicon'
          style={{ 
            height: '2.5rem', 
            width: 'auto'
          }}
        />
      </Menu.Item>
    </Menu>
  );
}