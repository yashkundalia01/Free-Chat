import './App.css';
import Welcome from './components/Welcome/Welcome';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Alert from './components/UI/Alert/Alert';
import Layout from './Container/Layout/Layout';
import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './store/actions/index';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    this.props.getUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Layout>
            <Route exact path='/' component={Welcome} />
            <section className='container'>
              <Alert />
              <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
              </Switch>
            </section>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(loadUser()),
  };
};

export default connect(null, mapDispatchToProps)(App);
