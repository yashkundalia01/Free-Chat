import { Fragment, Component } from "react";
import "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { Link } from "react-router-dom";

class navigationItems extends Component {
  render() {
    const myStyle = {
      margin: "10px",
      display: "block",
      width: "100%",
    };

    const authLinks = (
      <ul className="NavigationItems">
        <Link to="/chat" style={myStyle}>
          Chat
        </Link>
        <Link to="/post" style={myStyle}>
          Post
        </Link>
        <Link to="/profile" style={myStyle}>
          Profile
        </Link>
        <Link onClick={this.props.logout} to="/login" style={myStyle}>
          Logout
        </Link>
      </ul>
    );
    const guestLinks = (
      <ul className="NavigationItems">
        <NavigationItem link="/register"> Register </NavigationItem>
        <NavigationItem link="/login">Login</NavigationItem>
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
