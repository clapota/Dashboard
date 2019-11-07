import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './RegisterView.css';
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

const apiUrl = 'http://' + (process.env.API_HOST || 'localhost:3000');
console.log('API : ' + process.env.API_HOST);
class RegisterView extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            password: '',
            username: '',
            repeat: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
    }

    register(e) {
        e.preventDefault();
        if (this.state.password === this.state.repeat && this.state.password.trim().length >= 4 && this.state.username.trim().length >= 4) {
            const User = {username: this.state.username, password: this.state.password};
            const endpoint = apiUrl + '/login';

            fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify(User),
            })
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function(json) {
                        console.log(json);
                    });
                } else {
                    alert('Unknown network error, please try again later');
                }
            })
            .catch(error => alert('Error ' + error.message));
        } else {
            alert('Form is invalid');
        }
    }

    handleChange(name, event) {
        this.setState({
            ...this.state,
            [name]: event.target.value
        });
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
                                    Register
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
                                <TextField
                                    classes={{root: classes.textfield}}
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
                                    onChange={e => this.handleChange('repeat', e)}
                                    name="repeat"
                                    label="Repeat"
                                    type="password"
                                    id="repeat"
                                    autoComplete="current-password"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    onClick={e => this.register(e)}
                                >
                                    Register
                                </Button>
                                </form>
                                <Link className="link" to="/login">Login</Link>
                            </div>
                        </Card>
                    </Grid>
        );
    }
}

export default withCookies(withStyles(styles)(RegisterView));