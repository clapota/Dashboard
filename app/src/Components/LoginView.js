import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './LoginView.css';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/styles/withStyles';
import Card from '@material-ui/core/Card';
import { Avatar, TextField, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    card: {
        backgroundColor: 'white',
        minWidth: '30%',
        boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.75)",
        maxWidth: '100%',
        paddingBottom: '15px',
    },
    text: {
        color: 'black',
    },
    content: {
        flexGrow: 1,
        paddingTop: '100px',
        overflowX: 'hidden',
        overflowY: 'hidden',
    },
    grid: {
        height: '100%',
        background: 'linear-gradient(to right, #0052d4, #4364f7, #6fb1fc)',
    },
    title: {
        color: 'black',
        letterSpacing: '4px',
        fontWeight: 800,
    },
    textField: {
        maxWidth: '40%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    link: {
        color: 'white',
        fontWeight: 800,
        letterSpacing: '4px',
        '&:hover': {
            color: 'white',
        },
        marginBottom: '20px',
    },
    linkActive: {
        color: 'white',
        fontWeight: 800,
        letterSpacing: '4px',
        marginBottom: '20px',
        borderBottom: 'solid 1px white',
        '&:hover': {
            color: 'white',
        }
    },
    button: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    linkContainer: {
        maxWidth: '30%',
        justifyContent: 'space-evenly',
    }
})

const apiUrl = 'http://localhost:3000';

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
        const User = {username: this.state.username, password: this.state.password};
        const endpoint = apiUrl + '/login';

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(User),
        })
        .then((response) => response.json())
        .then((json) => {
            const {cookies} = this.props;
            cookies.set('jwt-dashboard', json.token);
            this.props.reloadApp();
        })
        .catch((error) => alert(error.message));

    }

    render() {
        const {classes} = this.props;
        
        return (
            <Grid
                container
                classes={{root: classes.grid}}
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid
                        container
                        alignItems="spaceBetween"
                        classes={{root: classes.linkContainer}}
                    >
                        <Link to="/login" className={classes.linkActive}>Login</Link>
                        <Link to="/register" className={classes.link}>Register</Link>
                    </Grid>
                        <Card classes={{root: classes.card}}>
                            <div className="paper">
                                <Avatar className="avatar">
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5" classes={{root: classes.title}}>
                                    Sign in
                                </Typography>
                                <form className="form" noValidate>
                                    <Grid
                                        container
                                        direction="column"
                                        justify="center"
                                        alignItems="space-between"
                                    >
                                <TextField
                                    classes={{root: classes.textField}}
                                    margin="normal"
                                    required
                                    id="username"
                                    label="Username"
                                    name="username"
                                    onChange={e => this.handleChange('username', e)}
                                    autoComplete="username"
                                    InputLabelProps={{
                                        style: {color: 'black'}
                                    }}
                                    InputProps={{
                                        style: {color: 'black'}
                                    }}
                                    autoFocus
                                    color="secondary"
                                    variant="outlined"
                                />
                                <TextField
                                    variant="outlined"
                                    classes={{root: classes.textField}}
                                    margin="normal"
                                    required
                                    InputLabelProps={{
                                        style: {color: 'black'}
                                    }}
                                    InputProps={{
                                        style: {color: 'black'}
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
                                    variant="contained"
                                    color="primary"
                                    classes={{root: classes.button}}
                                    onClick={e => this.login(e)}
                                >
                                    Register
                                </Button>
                                </Grid>
                                </form>
                            </div>
                        </Card>
                </Grid>
            </Grid>
        );
}
}

export default withCookies(withStyles(styles)(LoginView));