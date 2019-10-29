import React from 'react';
import LoginView from './Components/LoginView';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Dashboard from './Components/DashboardView';

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
      googleCredentials:  cookies.get('google-credentials')
    }
  }

  reloadCookies() {
    const { cookies } = this.props;
    this.setState({
      googleCredentials: cookies.get('google-credentials'),
    });
  }

  render() {
    if (this.state.googleCredentials === undefined) {
      return (
        <LoginView handler={this.reloadCookies} />
      );
    } else {
      return (<Dashboard/>)
    }
  }
}

export default withCookies(App);