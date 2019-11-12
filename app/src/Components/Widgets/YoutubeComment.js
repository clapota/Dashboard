import React from 'react';
import Card from '@material-ui/core/Card';
import './YoutubeComment.css';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { Typography, Container, CardContent, CardHeader, Modal, TextField, LinearProgress } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import './Widget.css';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/styles';
import {getComment} from '../../Services/YoutubeService';

const styles = themes => ({
    title: {
        color: 'black',
    },
    header: {
        backgroundColor: 'white',
    },
    card: {
        backgroundColor: 'white',
        maxHeight: 400,
        overflow: 'auto',
    },
    list: {
        overflow: 'auto',
    }
})

class YoutubeComment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videoLink: props.data.link,
            commentList: props.data.commentList,
            maxResult: props.data.maxResult,
            open: false,
            loading: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.updateComment = this.updateComment.bind(this);
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
        });
        this.updateComment();
    }

    handleChange(name, event) {
        if (name === 'maxResult') {
            const lastChar = event.target.value.charAt(event.target.value.length - 1);
            if (!(lastChar >= '0' && lastChar <= '9')) {
                event.target.value = event.target.value.substring(0, event.target.value.length - 1);
            }
            const value = parseInt(event.target.value);

            if (value < 0) {
                event.target.value = '0';
            } else if (value > 100) {
                event.target.value = '100';
            }
        }
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
        this.props.notifyChange(name, event.target.value, this.props.index);
    }

    updateComment() {
        if (this.state.videoLink !== undefined && this.state.maxResult !== undefined &&  !isNaN(this.state.maxResult)) {
            getComment(this.state.videoLink, this.state.maxResult)
            .then((response) => {
                this.setState({commentList: response});
                this.props.notifyChange('commentList', response, this.props.index);
            })
            .catch((err) => {
                this.setState({commentList: undefined});
                this.props.notifyChange('commentList', undefined, this.props.index);
            });
        }
    }
    
    render() {
        let commentList = [];

        const {classes} = this.props;
        if (this.state.commentList !== undefined) {
            for (let comment of this.state.commentList) {
                commentList.push(
                    <>
                    <ListItem>
                        <Container>
                            <Typography classes={{root: classes.title}} variant="h5">{comment.snippet.authorDisplayName}</Typography>
                            <Typography variant="p" classes={{root: classes.title}}>{comment.snippet.textOriginal}</Typography>
                        </Container>
                    </ListItem>
                    <Divider />
                    </>
                )
            }
        }
        return (
            <>
                <Card classes={{root: classes.card}}>
                    <CardHeader 
                        classes={{
                            title: classes.title,
                            root: classes.header,
                        }}
                        title="Youtube comment widget"
                        action={
                            <IconButton onClick={this.handleOpen}>
                                <MoreVert />
                            </IconButton>
                        }
                    />
                    <Divider />
                    <CardContent classes={{root: classes.content}}>{this.state.loading === true ? (<LinearProgress />) : commentList.length !== 0 ? <List classes={{root: classes.list}}>{commentList}</List> : this.state.videoLink === undefined ? (<Typography classes={{root: classes.title}}>Please provide a youtube video Url</Typography>) : (<Typography>Invalid url : {this.state.videoLink}</Typography>) }</CardContent>
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

export default withStyles(styles)(YoutubeComment);