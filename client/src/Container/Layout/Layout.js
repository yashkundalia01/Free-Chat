import React, { Component } from 'react';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/index';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenedHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  logoutUser = () => {
    this.props.logoutUser();
  };

  render() {
    return (
      <div>
        <Toolbar
          logout={this.logoutUser}
          loading={this.props.auth.loading}
          isAuthenticated={this.props.auth.isAuthenticated}
          open={this.sideDrawerOpenedHandler}
        />
        <SideDrawer
          logout={this.logoutUser}
          loading={this.props.auth.loading}
          isAuthenticated={this.props.auth.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
