import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MoreVert from '@material-ui/icons/MoreVert';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';
import {getSubscribers} from '../../Services/TwitchService';
import { Divider } from '@material-ui/core';

const styles = themes => ({
    title: {
        color: 'black',
    },
    header: {
        backgroundColor: 'white',
    },
    card: {
        backgroundColor: 'white',
    },
    subText: {
        fontSize: '3.5vw',
        color: 'black',
    }
})

class TwitchSubscribers extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.state = {
            username: props.data.username,
            subscribers: props.data.subscribers,
            open: false
        }
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    handleClose() {
        this.setState({
            ...this.state,
            open: false,
        });
        this.updateSub();
    }

    updateSub() {
        if (this.state.username !== undefined) {
            getSubscribers(this.state.username)
            .then((response) => {
                this.setState({subscribers: response});
                this.props.notifyChange('subscribers', response, this.props.index);
            })
            .catch((err) => {
                this.setState({subscribers: undefined});
                this.props.notifyChange('subscribers', undefined, this.props.index);
            });
        }
    }

    handleOpen() {
        this.setState({
            ...this.state,
            open: true,
        })
    }

    handleChange(name, event) {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
        this.props.notifyChange(name, event.target.value, this.props.index);
    }

    render() {
        const {classes} = this.props;
        return (
            <>
                <Card classes={{root: classes.card}}>
                    <CardHeader
                        classes={{
                            title: classes.title,
                            root: classes.header,
                        }}
                        title="Twitch subscribers widget"
                        action={
                            <IconButton onClick={this.handleOpen}>
                                <MoreVert />
                            </IconButton>
                        }
                    />
                    <Divider />
                    <CardContent>
                        {this.state.subscribers === undefined ? this.state.username === undefined ? 
                        <Typography classes={{root: classes.title}}>Please select an username</Typography>
                        : 
                        <Typography classes={{root: classes.title}}>{this.state.username} : Invalid username</Typography> 
                        : 
                        <Container>
                        <Typography classes={{root: classes.title}}>Total subcribers :</Typography><Typography classes={{root: classes.subText}}>{this.numberWithCommas(this.state.subscribers)}</Typography><Typography classes={{root: classes.title}}>{this.state.username}</Typography>
                        </Container>
                    }
                    </CardContent>
                </Card>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}>
                        <div className="modal-dashboard">
                            <Typography variant="h4">
                                Twitch subscribers settings
                            </Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                defaultValue={this.state.username}
                                onChange={e => this.handleChange('username', e)}
                            />
                        </div>
                </Modal>
            </>
        );
    }
}

export default withStyles(styles)(TwitchSubscribers);