import React from "react";
import "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../../Navigation/NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => {
  return (
    <header className='Toolbar'>
      <DrawerToggle open={props.open} />
      <div className='Logo'>
        <Logo />
      </div>
      <nav className='DesktopOnly'>
        <NavigationItems
          logout={props.logout}
          loading={props.loading}
          isAuthenticated={props.isAuthenticated}
        />
      </nav>
    </header>
  );
};

export default toolbar;
