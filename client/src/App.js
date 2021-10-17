import "./App.css";
import Welcome from "./components/Welcome/Welcome";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Profile from "./components/Profile/Profile";
import Alert from "./components/UI/Alert/Alert";
import Layout from "./Container/Layout/Layout";
import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { loadUser } from "./store/actions/index";
import { connect } from "react-redux";
import Dashboard from "./components/Dashboard/Dashboard";
import Chat from "./components/Chat/Chat";
import Video from "./components/Video/Video";
import Posts from "./components/Posts/PostForm/PostForm";
import ChangePassword from "./components/ChangePassword/ChangePassword";

class App extends Component {
  componentDidMount() {
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
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/chat' component={Chat} />
                <Route exact path='/Post' component={Posts} />
                <Route exact path='/video' component={Video} />
                <Route exact path='/changepassword' component={ChangePassword} />
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
