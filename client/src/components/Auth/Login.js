import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./style.css";
import { connect } from "react-redux";
import { login } from "../../store/actions/index";
import Spinner from "../UI/Spinner/Spinner";

class Login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
  };

  onChangeHandler = (e) =>
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });

  onSubmitHandler = (e) => {
    this.setState({ ...this.state, loading: true });
    e.preventDefault();
    try {
      this.props.loginUser(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ ...this.state, loading: false });
    }
  };

  render() {
    let loading = null;
    if (this.state.loading) {
      loading = <Spinner></Spinner>;
    }
    if (this.props.isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }
    return (
      <div>
        <div className='loading'>{loading}</div>
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'>Sign into Your Account</p>
        <form className='form' onSubmit={(e) => this.onSubmitHandler(e)}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              onChange={(e) => this.onChangeHandler(e)}
              name='email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              onChange={(e) => this.onChangeHandler(e)}
              placeholder='Password'
              name='password'
              minLength='6'
              required
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <p className='my-1'>
          Don't have an account? <Link to='/register'>Sign Up</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) => dispatch(login(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
