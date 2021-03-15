import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { useAuthContext } from '../context/auth';

function MenuBar() {
  const location = useLocation();
  const pathname = location.pathname;
  const activeItem = pathname === '/' ? 'home' : pathname.substr(1);

  const authContext = useAuthContext();

  if (authContext.user) {
    return MenuBarAuth({
      activeItem,
      authContext
    });
  } else {
    return MenuBarNotAuth({
      activeItem
    });
  }
}

function MenuBarAuth({ activeItem, authContext }) {
  return (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item content={authContext.user.username} />
        <Menu.Item
          name='signout'
          onClick={authContext.signout}
          as={Link}
          to='/'
        />
      </Menu.Menu>
    </Menu>
  );
}

function MenuBarNotAuth({ activeItem }) {
  return (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='signup'
          active={activeItem === 'signup'}
          as={Link}
          to='/signup'
        />
        <Menu.Item
          name='signin'
          active={activeItem === 'signin'}
          as={Link}
          to='/signin'
        />
      </Menu.Menu>
    </Menu>
  );
}

export default MenuBar;
