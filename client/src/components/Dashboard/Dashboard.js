import React from "react";
import "./Dashboard.css";
import { Component } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../store/actions";
import Spinner from "../UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  state = {
    profile: null,
  };
  async componentDidMount() {
    await this.props.getProfiles();
    const allProfiles = await this.props.profiles;
    this.setState({ ...this.state, profile: allProfiles });
  }

  render() {
    if (!localStorage.token) {
      return <Redirect to='/login' />;
    }
    const allProfiles = this.state.profile;
    let friendList = null;
    let spinner = null;
    if (allProfiles) {
      friendList = allProfiles.map((friend) => {
        return (
          <a href={"/video?" + "id=" + friend._id}>
            <div className='friend profile bg-light' key={friend._id}>
              <img className='round-img' src={friend.imageUrl} alt='Loading' />
              <div>
                <h2>{friend.user.name}</h2>
                <p>{friend.status}</p>
                <p>{friend.location}</p>
              </div>
            </div>
          </a>
        );
      });
      spinner = null;
      if (allProfiles.length == 0) friendList = "No friends";
    } else {
      spinner = <Spinner></Spinner>;
    }
    return (
      <div>
        <h1 className='large1 text-primary'>Friend List</h1>
        <div className='profiles'>{friendList}</div>
        {spinner}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profile.profiles,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfiles: () => dispatch(getProfiles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
