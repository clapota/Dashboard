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

const url = 'https://www.googleapis.com/youtube/v3/channels';
const apiKey = 'AIzaSyA6OihoMHEMZciRB6KonGj5g_sOfY8boFA';

const styles = themes => ({
    title: {
        color: 'black',
    },
    header: {
        backgroundColor: 'white',
    },
    card: {
        backgroundColor: 'lightgrey',
    },
    subText: {
        fontSize: '3.5vw',
        color: 'black',
    }
})

class YoutubeSubscribers extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.state = {
            username: this.props.username,
            subscribers: undefined,
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
        this.fetchSubscribersInfo();
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

    }

    fetchSubscribersInfo() {
        if (this.state.username !== undefined) {
            const fullUrl = url + '?key=' + apiKey + '&part=id,statistics&forUsername=' + this.state.username
            fetch(fullUrl)
                .then(response => response.json())
                .then(data =>
                    this.setState({
                        ...this.state,
                        subscribers: data.pageInfo.totalResults > 0 ? data.items[0].statistics.subscriberCount : undefined
            }))
        }
    }

    componentDidMount() {
        this.fetchSubscribersInfo();
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
                        title="Youtube subscribers widget"
                        action={
                            <IconButton onClick={this.handleOpen}>
                                <MoreVert />
                            </IconButton>
                        }
                    />
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
                                Youtube subscribers settings
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

export default withStyles(styles)(YoutubeSubscribers);