import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import 'bootstrap/dist/css/bootstrap.css';
import './DashboardView.css';
import ResponsiveDrawer from './Sidebar';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import AddNewWidget from './Widgets/AddNewWidget';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        paddingTop: '100px',
        overflowX: 'hidden',
        overflowY: 'hidden',
    },
    title: {
        color: 'white',
    }
})


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0, widgetList: []};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.addWidget = this.addWidget.bind(this);
    }

    addWidget(widget) {
        let widgets = this.state.widgetList;
        widgets.push(<GridListTile className="gridlist-tile">{widget}</GridListTile>);
        this.setState({
            ...this.state,
            widgetList: widgets
        });
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
                    <GridList cellHeight="auto" className="gridlist" cols={this.state.width > 760 ? 2 : 1}>
                        {this.state.widgetList}
                        <GridListTile className="gridlist-tile">
                            <AddNewWidget listener={this.addWidget} />
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