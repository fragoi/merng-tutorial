import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default function MenuBar() {
  const pathname = window.location.pathname;
  const name = pathname === '/' ? 'home' : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(name);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='signup'
          active={activeItem === 'signup'}
          onClick={handleItemClick}
          as={Link}
          to='/signup'
        />
        <Menu.Item
          name='signin'
          active={activeItem === 'signin'}
          onClick={handleItemClick}
          as={Link}
          to='/signin'
        />
      </Menu.Menu>
    </Menu>
  );
}
