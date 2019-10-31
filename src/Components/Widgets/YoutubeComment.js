import React from 'react';
import Card from '@material-ui/core/Card';
import './YoutubeComment.css';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { Typography, Container, CardContent, CardHeader, Modal, TextField, LinearProgress } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import './Widget.css';

const commentThreadUrl = 'https://www.googleapis.com/youtube/v3/commentThreads';

const commentsUrl = 'https://www.googleapis.com/youtube/v3/comments'

const apiKey = 'AIzaSyA6OihoMHEMZciRB6KonGj5g_sOfY8boFA';

class YoutubeComment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videoLink: props.videoLink,
            commentList: undefined,
            maxResult: props.maxResult,
            open: false,
            loading: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen() {
        this.setState({
            ...this.state,
            open: true,
        });
    }

    handleClose() {
        this.setState({
            ...this.state,
            open: false,
        })
    }

    handleChange(name, event) {
        console.log('jaime le caca');
        if (name === 'maxResult') {
            let lastChar = event.target.value.charAt(event.target.value.length - 1);
            if (!(lastChar >= '0' && lastChar <= '9')) {
                event.target.value = event.target.value.substring(0, event.target.value.length - 1);
            }
            let value = parseInt(event.target.value);

            if (value < 0) {
                event.target.value = '0';
            } else if (value > 100) {
                event.target.value = '100';
            }
        }
        console.log(name);
        this.setState({
            ...this.state,
            [name]: event.target.value,
        }, () => this.fetchCommentList());
    }

    fetchComments(data) {
        let idString = '';
        if (data.pageInfo.totalResults > 0) {
            let items = data.items;
            for (let item of items)
                idString += item.id + ',';
        }
        console.log(idString);
        const fullUrlComment = commentsUrl + '?id=' + idString + '&key=' + apiKey + '&part=id,snippet';

        fetch(fullUrlComment)
            .then(response => response.json())
            .then(data => 
                    this.setState({
                        ...this.state,
                        commentList: data.items,
                        loading: false,
                    })
                )
            .catch(error => console.log(error));
    }

    fetchCommentList() {
        this.setState({
            loading: true,
        })
        console.log('LINK ' + this.state.videoLink);
        let id = this.youtubeParser(this.state.videoLink);

        console.log(parseInt(this.state.maxResult));
        if (id !== false && this.state.maxResult !== undefined && !isNaN(parseInt(this.state.maxResult))) {
            const fullUrlThread = commentThreadUrl + '?videoId=' + id + '&key=' + apiKey + '&part=id&maxResults=' + this.state.maxResult;

            fetch(fullUrlThread)
                .then(response => response.json())
                .then(data => 
                    this.fetchComments(data)
                );
        } else {
            this.setState({
                ...this.state,
                commentList: undefined
            })
            this.setState({
                loading: false,
            })
        }
        return 0;
    }

    youtubeParser(url){
        if (url === undefined)
            return false;
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length===11)? match[7] : false;
    }

    componentDidMount() {
        this.fetchCommentList();
    }
    
    render() {
        let commentList = [];

        console.log('TEST 1 2 3');
        if (this.state.commentList !== undefined) {
            for (let comment of this.state.commentList) {
                commentList.push(
                    <>
                    <ListItem>
                        <Container>
                            <Typography variant="h5">{comment.snippet.authorDisplayName}</Typography>
                            <Typography variant="p">{comment.snippet.textOriginal}</Typography>
                        </Container>
                    </ListItem>
                    <Divider/>
                    </>
                )
            }
        }
        return (
            <>
                <Card className="card-comment">
                    <CardHeader 
                        title="Youtube comment widget"
                        action={
                            <IconButton onClick={this.handleOpen}>
                                <MoreVert />
                            </IconButton>
                        }
                    />
                    <CardContent>{this.state.loading === true ? (<LinearProgress />) : commentList.length !== 0 ? commentList : this.state.videoLink === undefined ? (<Typography>Please provide a youtube video Url</Typography>) : (<Typography>Invalid url : {this.state.videoLink}</Typography>) }</CardContent>
                </Card>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div className="modal-dashboard">
                        <Typography variant="h4">
                            Youtube comment settings
                        </Typography>
                        <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="videoLink"
                                label="Video Link"
                                name="videoLink"
                                autoComplete="videoLink"
                                autoFocus
                                defaultValue={this.state.videoLink}
                                onChange={e => this.handleChange('videoLink', e)}
                        />
                        <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="maxResult"
                                label="Max Results (max : 100)"
                                name="maxResult"
                                autoComplete="maxResult"
                                autoFocus
                                defaultValue={this.state.maxResult}
                                onChange={e => this.handleChange('maxResult', e)}
                        />
                    </div>
                </Modal>
            </>
        )
    }
}

export default YoutubeComment;