import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './LoginView.css';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/styles/withStyles';
import Card from '@material-ui/core/Card';
import { Container, CssBaseline, Avatar, TextField, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from 'react-router-dom/Link';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    card: {
        backgroundColor: '#25213A',
        boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
    },
    text: {
        color: 'white',
    },
    content: {
        flexGrow: 1,
        paddingTop: '100px',
        overflowX: 'hidden',
        overflowY: 'hidden',
    },
    grid: {
        paddingTop: '150px',
    },
    title: {
        color: 'white',
    },
    link: {
        paddingY: '5px',
    }
})


class LoginView extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange(name, event) {
        this.setState({
            ...this.state,
            [name]: event.target.value
        });
    }

    login(e) {
        e.preventDefault();
        alert('not implemented');
    }

    render() {
        const {classes} = this.props;
        return (
                    <Grid
                    container
                    classes={{root: classes.grid}}
                    direction="column"
                    justify="flex-end"
                    alignItems="center"
                    >
                        <Card classes={{root: classes.card}}>
                            <div className="paper">
                                <Avatar className="avatar">
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5" classes={{root: classes.text}}>
                                    Sign in
                                </Typography>
                                <form className="form" noValidate>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    onChange={e => this.handleChange('username', e)}
                                    autoComplete="username"
                                    InputLabelProps={{
                                        style: {color: 'white'}
                                    }}
                                    InputProps={{
                                        style: {color: 'white'}
                                    }}
                                    autoFocus
                                    color="secondary"
                                />
                                <TextField
                                    classes={{root: classes.textfield}}
                                    margin="normal"
                                    required
                                    fullWidth
                                    InputLabelProps={{
                                        style: {color: 'white'}
                                    }}
                                    InputProps={{
                                        style: {color: 'white'}
                                    }}
                                    FormHelperTextProps={{
                                        style: {color: 'white'}
                                    }}
                                    color="secondary"
                                    onChange={e => this.handleChange('password', e)}
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
                                    onClick={e => this.login(e)}
                                >
                                    Sign In
                                </Button>
                                </form>
                                <Link className="link" to="/register">Register now</Link>
                            </div>
                        </Card>
                    </Grid>
        );
    }
}

export default withCookies(withStyles(styles)(LoginView));