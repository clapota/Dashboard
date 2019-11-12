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
import { LinearProgress } from '@material-ui/core';
import { getViews } from '../../Services/YoutubeService';

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

class YoutubeView extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.state = {
            videoName: props.data.videoName,
            videoUrl: props.data.videoUrl,
            views: props.data.views,
            open: false,
            loading: false,
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
        this.updateViews();
    }

    youtubeParser(url){
        if (url === undefined)
            return false;
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length===11)? match[7] : false;
    }

    updateViews() {
        if (this.state.videoUrl) {
            getViews(this.state.videoUrl)
            .then((response) => {
                this.setState({
                    views: response.views,
                    videoName: response.videoName,
                })
                this.props.notifyChange('videoName', response.videoName, this.props.index);
                this.props.notifyChange('views', response.views, this.props.index);
            })
            .catch((err) => {
                this.setState({
                    views: undefined,
                    videoName: undefined,
                });
                this.props.notifyChange('videoName', undefined, this.props.index);
                this.props.notifyChange('views', undefined, this.props.index);
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
                        title="Youtube views widget"
                        action={
                            <IconButton onClick={this.handleOpen}>
                                <MoreVert />
                            </IconButton>
                        }
                    />
                    <CardContent>
                        {this.state.views === undefined ? this.state.videoUrl === undefined ? 
                        <Typography classes={{root: classes.title}}>Please enter a youtube video url</Typography>
                        :
                        <Typography classes={{root: classes.title}}>{this.state.videoUrl} : Invalid url</Typography> 
                        : 
                        this.state.loading ? 
                        <Container>
                            <Typography>BITE</Typography>
                            <LinearProgress />
                        </Container>
                        :
                        <Container>
                            <Typography classes={{root: classes.title}}>Total views :</Typography><Typography classes={{root: classes.subText}}>{this.numberWithCommas(this.state.views)}</Typography><Typography classes={{root: classes.title}}>{this.state.videoName}</Typography>
                        </Container>
                    }
                    </CardContent>
                </Card>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}>
                        <div className="modal-dashboard">
                            <Typography variant="h4">
                                Youtube views settings
                            </Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="videoUrl"
                                label="Video URL"
                                name="videoUrl"
                                autoComplete="videoUrl"
                                autoFocus
                                defaultValue={this.state.videoUrl}
                                onChange={e => this.handleChange('videoUrl', e)}
                            />
                        </div>
                </Modal>
            </>
        );
    }
}

export default withStyles(styles)(YoutubeView);