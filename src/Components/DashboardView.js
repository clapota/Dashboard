import React from 'react';
import {GridList, GridListTile} from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import './DashboardView.css';
import ResponsiveDrawer from './Sidebar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import MeteoWidget from './Widgets/MeteoWidget';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        paddingTop: '100px',
    },
})


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight})
    }

    render() {
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <ResponsiveDrawer/>
                <div className={classes.content}>
                    <GridList cols={this.state.width > 760 ? 2 : 1}>
                        <GridListTile className="gridlist-tile">
                            <MeteoWidget city="London"/>
                        </GridListTile>
                    </GridList>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);