import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MoreVert from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import { Divider } from '@material-ui/core';
import { isStreaming } from '../../Services/TwitchService';
import VisibilityIcon from '@material-ui/icons/Visibility';

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
    },
    streamTitle: {
        fontWeight: 800,
        color: 'black',
        maxWidth: '70%',
    }
})

class TwitchStreamer extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.updateStream = this.updateStream.bind(this);
        this.state = {
            username: props.data.username,
            viewers: props.data.viewers,
            thumbnail: props.data.thumbnail,
            title: props.data.title,
            open: false,
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
        this.updateStream();
    }

    updateStream() {
        if (this.state.username !== undefined) {
            isStreaming(this.state.username)
            .then((response) => {
                this.setState({
                    viewers: response.viewers,
                    title: response.title,
                    thumbnail: response.thumbnail,
                });
                this.props.notifyChange('viewers', response.viewers, this.props.index);
                this.props.notifyChange('title', response.title, this.props.index);
                this.props.notifyChange('thumbnail', response.thumbnail, this.props.index);
            })
            .catch((error) => {
                this.setState({
                    viewers: undefined,
                    title: undefined,
                    thumbnail: undefined,
                })
                this.props.notifyChange('viewers', undefined, this.props.index);
                this.props.notifyChange('title', undefined, this.props.index);
                this.props.notifyChange('thumbnail', undefined, this.props.index);                
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
                        title="Twitch streamer widget"
                        action={
                            <IconButton onClick={this.handleOpen}>
                                <MoreVert />
                            </IconButton>
                        }
                    />
                    <Divider />
                    <CardContent>
                        {this.state.viewers === undefined ? this.state.username === undefined ? 
                        <Typography classes={{root: classes.title}}>Please select an username</Typography>
                        : 
                        <Typography classes={{root: classes.title}}>{this.state.username} : Invalid username</Typography> 
                        : 
                        <Grid container direction="column">
                            <img src={this.state.thumbnail} alt="Stream thumbnail" />
                            <Grid container direction="row" justify="space-between">
                                <Typography classes={{root: classes.streamTitle}}>{this.state.title}</Typography>
                                <div>
                                    <VisibilityIcon />
                                    <Typography classes={{root: classes.title}}>{this.state.viewers}</Typography>
                                </div>
                            </Grid>
                        </Grid>
                    }
                    </CardContent>
                </Card>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}>
                        <div className="modal-dashboard">
                            <Typography variant="h4">
                                Twitch streamer settings
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

export default withStyles(styles)(TwitchStreamer);