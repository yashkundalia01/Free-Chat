import { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './style.css';
import { connect } from 'react-redux';
import { login } from '../../store/actions/index';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onChangeHandler = (e) =>
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state.email, this.state.password);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }
    return (
      <div>
        {/* <div className='alert alert-danger'>Invalid credentials</div> */}
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
