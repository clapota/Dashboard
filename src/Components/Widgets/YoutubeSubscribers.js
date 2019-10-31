import React from 'react';

const clientId = '510533827407-n2igosum7o4v74csdek2page5t52g9th.apps.googleusercontent.com';

class YoutubeSubscribers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chain: this.props.chain,
            subscribers: undefined
        }
    }

    componentDidMount() {
//        fetch()
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default YoutubeSubscribers;