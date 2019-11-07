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

const url = 'https://www.googleapis.com/youtube/v3/videos';
const apiKey = 'AIzaSyA6OihoMHEMZciRB6KonGj5g_sOfY8boFA';

const styles = themes => ({
    title: {
        color: 'white',
    },
    header: {
        backgroundColor: '#3f51b5',
    },
    card: {
        backgroundColor: '#27293d',
    },
    subText: {
        fontSize: '3.5vw',
        color: 'white',
    }
})

class YoutubeView extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.youtubeParser = this.youtubeParser.bind(this);
        this.fetchViewsInfo = this.fetchViewsInfo.bind(this);
        this.state = {
            videoName: undefined,
            videoUrl: undefined,
            views: undefined,
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
        this.fetchViewsInfo();
    }

    youtubeParser(url){
        if (url === undefined)
            return false;
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length===11)? match[7] : false;
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

    fetchViewsInfo() {
        if (this.state.videoUrl !== undefined) {
            this.setState({loading: true});
            const id = this.youtubeParser(this.state.videoUrl);
            if (id !== false) {
                const fullUrl = url + '?key=' + apiKey + '&part=id,statistics,snippet&id=' + id;
                fetch(fullUrl)
                    .then(response => response.json())
                    .then(data => this.setState({
                        ...this.state,
                        views: data.pageInfo.totalResults >= 1 ? data.items[0].statistics.viewCount : undefined,
                        videoName: data.pageInfo.totalResults >= 1 ? data.items[0].snippet.title : undefined
                    }))
                    .catch((err) => alert(err.message));
            }
            this.setState({loading: false});
        }
    }

    componentDidMount() {
        this.fetchViewsInfo();
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