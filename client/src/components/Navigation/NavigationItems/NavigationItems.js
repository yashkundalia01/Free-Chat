import { Fragment, Component } from "react";
import "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

class navigationItems extends Component {
  render() {
    const myStyle = {
      margin: "10px",
      display: "block",
      width: "100%",
    };

    const authLinks = (
      <ul className='NavigationItems'>
        <a style={myStyle} href='/profile'>
          Profile
        </a>
        <a style={myStyle} onClick={this.props.logout} href='/login'>
          Logout
        </a>
      </ul>
    );
    const guestLinks = (
      <ul className='NavigationItems'>
        <NavigationItem link='/register'> Register </NavigationItem>
        <NavigationItem link='/login'>Login</NavigationItem>
      </ul>
    );
    return (
      <Fragment>
        {!this.props.loading && (
          <Fragment>
            {this.props.isAuthenticated ? authLinks : guestLinks}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default navigationItems;
