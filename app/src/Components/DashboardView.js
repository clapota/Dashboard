import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import 'bootstrap/dist/css/bootstrap.css';
import './DashboardView.css';
import ResponsiveDrawer from './Sidebar';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import AddNewWidget from './Widgets/AddNewWidget';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Container } from '@material-ui/core';
import DragableItem from './Widgets/DragableGridListTile';
import DropableZone from './Widgets/DropableZone';
import MeteoWidget from './Widgets/MeteoWidget';
import YoutubeComment from './Widgets/YoutubeComment';
import YoutubeView from './Widgets/YoutubeView';
import YoutubeSubscribers from './Widgets/YoutubeSubscribers';
import TwitchStreamer from './Widgets/TwitchStreamer';
import TwitchSubscribers from './Widgets/TwitchSubscribers';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    gridlist: {
        marginTop: '20px',
        padding: 'auto',
        overflowY: 'none',
    },
    content: {
        flexGrow: 1,
        paddingTop: '20px',
    },
    toolbar: theme.mixins.toolbar,
    title: {
        color: 'white',
    },
    container: {
        margin: '0',
    },
    gridListTile: {
        padding: '0 !important',
        boxShadow: '0 4px 4px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)',
    },
    gridTile: {
        overflow: 'inherit',
    }
})

const widgetList = new Map([
    ['meteo', 'MeteoWidget'],
    ['sub', 'YoutubeSubscribers'],
    ['comment', 'YoutubeComment'],
    ['view', 'YoutubeView'],
    ['stream', 'TwitchStreamer'],
    ['subtwitch', 'TwitchSubscribers'],
]);

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0, widgetList: [], editMode: false};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.addWidget = this.addWidget.bind(this);
        this.triggerEdit = this.triggerEdit.bind(this);
        this.moveWidget = this.moveWidget.bind(this);
        this.notifyChange = this.notifyChange.bind(this);
    }

    moveWidget = (index, monitor, component) => {
        let widgets = [...this.state.widgetList];
        let tmp = widgets[component.index];

        widgets[component.index] = widgets[index];
        widgets[index] = tmp;
        this.setState({
            widgetList: widgets,
        });
    }

    addWidget(widget) {
        let widgets = this.state.widgetList;
        switch(widget) {
            case 'meteo':
                widgets.push({widget: widgetList.get(widget), unit: undefined, city: undefined});
                break;
            case 'sub':
                widgets.push({widget: widgetList.get(widget), username: undefined});
                break;
            case 'view':
                widgets.push({widget: widgetList.get(widget), link: undefined});
                break;
            case 'comment':
                widgets.push({widget: widgetList.get(widget), maxResult: undefined, link: undefined});
                break;
            case 'stream':
                widgets.push({widget: widgetList.get(widget), username: undefined, viewers: undefined, thumbnail_url: undefined, title: undefined});
                break;
            case 'subtwitch':
                widgets.push({widget: widgetList.get(widget), username: undefined});
                break;
            default:
                break;
        }
        this.setState({widgetList: widgets});
    }

    triggerEdit(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            editMode: !this.state.editMode,
        });
    }

    notifyChange(name, value, index) {
        let widgets = this.state.widgetList;
        widgets[index] = {...widgets[index], [name]: value};
        this.setState({widgetList: widgets});
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

    mapWidgetData(data, index) {
        switch (data.widget) {
            case 'MeteoWidget':
                return (<MeteoWidget data={data} notifyChange={this.notifyChange} index={index}/>);
            case 'YoutubeSubscribers':
                return (<YoutubeSubscribers data={data} notifyChange={this.notifyChange} index={index}/>);
            case 'YoutubeComment':
                return (<YoutubeComment data={data} notifyChange={this.notifyChange} index={index}/>);
            case 'YoutubeView':
                return (<YoutubeView data={data} notifyChange={this.notifyChange} index={index}/>);
            case 'TwitchStreamer':
                return (<TwitchStreamer data={data} notifyChange={this.notifyChange} index={index} />);
            case 'TwitchSubscribers':
                return (<TwitchSubscribers data={data} notifyChange={this.notifyChange} index={index} />);
            default:
                return undefined;
        }
    }

    render() {
        const {classes} = this.props;
        let editTrigger = undefined;
        let widgets = [];

        if (this.state.editMode === false) {
            let i = 0;
            for (let widget of this.state.widgetList) {
                let component = this.mapWidgetData(widget, i);
                widgets.push(<GridListTile classes={{tile: classes.gridTile}}>{component}</GridListTile>);
                i++;
            }
        } else {
            let i = 0;
            for (let widget of this.state.widgetList) {
                let component = this.mapWidgetData(widget, i);
                widgets.push(<GridListTile classes={{tile: classes.gridTile}}><DropableZone index={i}  callback={this.moveWidget}><DragableItem index={i} child={component} /></DropableZone></GridListTile>);
                i++;
            }
        }
        if (this.state.editMode === true) {
            editTrigger =
            (<GridListTile classes={{tile: classes.gridListTile}}>
                <AddNewWidget listener={this.addWidget} />
            </GridListTile>);
        }
        return(
            <div className={classes.root}>
                <DndProvider backend={HTML5Backend}>
                    <ResponsiveDrawer onEdit={this.triggerEdit}/>
                    <main className={classes.content} >
                        <div className={classes.toolbar} />
                        <Container classes={{root: classes.container}}>
                            <GridList cellHeight="auto" classes={{root: classes.gridlist}} spacing={20} cols={this.state.width < 1000 ? 1 : 2}>
                                {widgets}
                                {editTrigger}
                            </GridList>
                        </Container>
                    </main>
                </DndProvider>
            </div>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);