import React from 'react';
import LoginView from './Components/LoginView';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Dashboard from './Components/DashboardView';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Settings from './Components/SettingsView';
import RegisterView from './Components/RegisterView';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme)

function NoLogRoute({isAuthenticated, children, ...rest}) {
  return (
    <Route
      {...rest}
      render={({location}) =>
      !isAuthenticated ? (
        children
      ) : (
        <Redirect
        to={{
          pathname: "/",
          state: {from: location}
        }}
        />
      )}
    />
  );
}

function PrivateRoute({isAuthenticated, children, ...rest}) {
  return (
    <Route
      {...rest}
      render={({location}) =>
      isAuthenticated ? (
        children
      ) : (
        <Redirect
        to={{
          pathname: "/login",
          state: {from: location}
        }}
        />
      )}
    />
  );
}

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    library.add(fab);

    const { cookies } = props;
    this.reloadCookies = this.reloadCookies.bind(this);
    this.reloadApp = this.reloadApp.bind(this);
    this.checkJwt = this.checkJwt.bind(this);
    this.state = {
      jwt:  cookies.get('jwt-dashboard'),
      isAuthenticated: false,
    }
  }

  reloadCookies() {
    const { cookies } = this.props;
    this.setState({
      jwt: cookies.get('jwt-dashboard'),
    });
  }

  reloadApp() {
    const {cookies} = this.props;
    this.setState({...this.state, jwt: cookies.get('jwt-dashboard')});
    this.checkJwt();
  }

  checkJwt() {
    if (this.state.jwt !== undefined && this.state.jwt !== 'undefined') {
      this.setState({
        isAuthenticated: true,
      });
    }
  }

  componentDidMount() {
    this.checkJwt();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" isAuthenticated={this.state.isAuthenticated}>
              <Dashboard/>
            </PrivateRoute>
            <PrivateRoute path="/settings" isAuthenticated={this.state.isAuthenticated}>
              <Settings/>
            </PrivateRoute>
            <NoLogRoute path="/login" isAuthenticated={this.state.isAuthenticated}>
              <LoginView reloadApp={this.reloadApp}/>
            </NoLogRoute>
            <NoLogRoute path="/register" isAuthenticated={this.state.isAuthenticated}>
              <RegisterView reloadApp={this.reloadApp}/>
            </NoLogRoute>
          </Switch>
        </Router>
      </ThemeProvider>
    )
  }
}

export default withCookies(App);