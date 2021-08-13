import React from 'react';
import './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  let attachedClasses = ['SideDrawer', 'Close'];

  if (props.open) {
    attachedClasses = ['SideDrawer', 'Open'];
  }

  return (
    <div>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className='Logo'>
          <Logo />
        </div>
        <nav>
          <NavigationItems
            logout={props.logout}
            loading={props.loading}
            isAuthenticated={props.isAuthenticated}
          />
        </nav>
      </div>
    </div>
  );
};

export default sideDrawer;
