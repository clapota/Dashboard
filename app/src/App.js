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

const isAuthenticated = true;

let theme = createMuiTheme();
theme = responsiveFontSizes(theme)

function NoLogRoute({children, ...rest}) {
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

function PrivateRoute({children, ...rest}) {
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
    this.state = {
      googleCredentials:  cookies.get('jwt-dashboard')
    }
  }

  reloadCookies() {
    const { cookies } = this.props;
    this.setState({
      googleCredentials: cookies.get('jwt-dashboard'),
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <PrivateRoute exact path="/">
              <Dashboard/>
            </PrivateRoute>
            <PrivateRoute path="/settings">
              <Settings/>
            </PrivateRoute>
            <NoLogRoute path="/login">
              <LoginView/>
            </NoLogRoute>
            <NoLogRoute path="/register">
              <RegisterView />
            </NoLogRoute>
          </Switch>
        </Router>
      </ThemeProvider>
    )
  }
}

export default withCookies(App);