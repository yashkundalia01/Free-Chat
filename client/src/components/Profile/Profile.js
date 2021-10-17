import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import storage from "../../firebase/index";
import * as action from "../../store/actions/index";
import Spinner from "../UI/Spinner/Spinner";
import "./Profile.css";

class Profile extends Component {
  state = {
    status: "",
    location: "",
    bio: "",
    imageUrl: "",
    image: null,
    loading: false,
  };

  onChangeHandler = (e) => {
    if (e.target.files != null && e.target.files[0]) {
      this.setState({ ...this.state, image: e.target.files[0] });
    } else {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value,
      });
    }
  };

  onSubmitHandler = (e) => {
    this.setState({ ...this.state, loading: true });
    const { status, bio, location, imageUrl, image } = this.state;
    e.preventDefault();
    const name = image.name + new Date();
    const uploadTask = storage.ref(`images/${name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ ...this.state, loading: false });
            this.props.setProfile({ status, bio, location, url });
            this.setState({ ...this.state, imageUrl: url });
          });
      }
    );
  };

  deleteAccount = () => {
    this.props.deleteAccount();
  };

  render() {
    if (!localStorage.token) {
      return <Redirect to='/login' />;
    }
    let loading = null;
    if (this.state.loading) {
      loading = <Spinner></Spinner>;
    }
    return (
      <div>
        <div className='loading'>{loading}</div>
        <h1 className='large text-primary'>Create Your Profile</h1>
        <p className='lead'>
          Let's get some information to make your profile good
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={(e) => this.onSubmitHandler(e)}>
          <div className='form-group'>
            <input
              required
              type='text'
              placeholder='Status'
              name='status'
              onChange={(e) => this.onChangeHandler(e)}
            />
            <small className='form-text'>
              Give us an idea of where you are at in your career
            </small>
          </div>

          <div className='form-group'>
            <input
              required
              type='text'
              placeholder='Location'
              name='location'
              onChange={(e) => this.onChangeHandler(e)}
            />
            <small className='form-text'>
              City & state suggested (eg. Boston, MA)
            </small>
          </div>

          <div className='form-group'>
            <textarea
              required
              placeholder='A short bio of yourself'
              name='bio'
              onChange={(e) => this.onChangeHandler(e)}
            ></textarea>
            <small className='form-text'>Tell us a little about yourself</small>
          </div>
          <div className='form-group'>
            <input
              type='file'
              required
              name='profileImage'
              onChange={(e) => this.onChangeHandler(e)}
            />
            <small className='form-text'>Upload your profile image</small>
          </div>

          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Dashboard
          </Link>
          <a
            className='btn btn-danger my-1'
            onClick={() => this.deleteAccount()}
          >
            Delete account
          </a>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToDispatch = (dispatch) => {
  return {
    setProfile: ({ status, bio, location, url }) =>
      dispatch(action.updateProfile({ status, bio, location, url })),
    deleteAccount: () => dispatch(action.deleteAccount()),
  };
};

export default connect(mapStateToProps, mapDispatchToDispatch)(Profile);
