import { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './style.css';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };

  onChangeHandler = (e) =>
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });

  onSubmitHandler = (e) => {
    const { name, email, password } = this.state;
    e.preventDefault();
    if (this.state.password === this.state.password2)
      this.props.register({ name, email, password });
    else this.props.setAlert('Passwords do not match', 'danger');
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }
    return (
      <div>
        <h1 className='large'>Sign Up</h1>
        <p className='lead'>Create Your Account</p>
        <form className='form' onSubmit={(e) => this.onSubmitHandler(e)}>
          <div className='form-group'>
            <input
              type='text'
              onChange={(e) => this.onChangeHandler(e)}
              placeholder='Name'
              name='name'
              value={this.state.name}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              onChange={(e) => this.onChangeHandler(e)}
              placeholder='Email Address'
              name='email'
              value={this.state.email}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              onChange={(e) => this.onChangeHandler(e)}
              placeholder='Password'
              name='password'
              value={this.state.password}
              minLength='6'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              onChange={(e) => this.onChangeHandler(e)}
              placeholder='Confirm Password'
              name='password2'
              value={this.state.password2}
              minLength='6'
              required
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>
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
    setAlert: (msg, alertType) => dispatch(action.setAlert(msg, alertType)),
    register: ({ name, email, password }) =>
      dispatch(action.register({ name, email, password })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
