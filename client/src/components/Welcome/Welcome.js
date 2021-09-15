import { Component } from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
      <div>
        <section className='background'>
          <div className='dark-overlay'>
            <div className='background-inner'>
              <h1 className='x-large'>Free Chat</h1>
              <p className='lead'>Create a profile, chat with your friends.</p>
              <div>
                <Link to='/register' className='btn btn-primary'>
                  Sign Up
                </Link>
                <Link to='/login' className='btn btn-light'>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Welcome;
