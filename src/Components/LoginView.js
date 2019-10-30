import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LoginView.css';
import { instanceOf } from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { withCookies, Cookies } from 'react-cookie';
import Button from '@material-ui/core/Button';
import { Container, CssBaseline, Avatar, TextField, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

class LoginView extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.googleOnSuccess = this.googleOnSuccess.bind(this);
        this.googleOnFailure = this.googleOnFailure.bind(this);
    }

    googleOnSuccess(response) {
        const { cookies } = this.props;
        let expirationDate = new Date('now');

        expirationDate = new Date(expirationDate.setMonth(expirationDate.getMonth()+1));
        cookies.set('google-credentials', response.toString(), {path: '/', expires: expirationDate});
        this.props.handler();
    }

    googleOnFailure(response) {
        console.log(response.error);
    }

    render() {
        return (
                <Container className="login-form"component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className="paper">
                        <Avatar className="avatar">
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className="form" noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit"
                        >
                            Sign In
                        </Button>
                        </form>
                        <GoogleLogin
                                    buttonText="Login With google"
                                    clientId="510533827407-r7e4usbqtgurv1p47vmb3n9a8f8nnm7j.apps.googleusercontent.com"
                                    render={
                                        renderProps => (
                                            <Button variant="contained" color="secondary" className="google-submit" onClick={renderProps.onClick} disabled={renderProps.disabled}><FontAwesomeIcon className="icon-google" color="white" icon={['fab', 'google']}/>Sign in with google</Button>
                                        )
                                    }
                                    redirectUri="localhost:8080"
                                    onSuccess={this.googleOnSuccess}
                                    onFailure={this.googleOnFailure}
                                    cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </Container>
        );
    }
}

export default withCookies(LoginView);