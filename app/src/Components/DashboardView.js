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
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        '&:hover': {
            boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        }
    }
})


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0, widgetList: [], editMode: false};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.addWidget = this.addWidget.bind(this);
        this.triggerEdit = this.triggerEdit.bind(this);
        this.moveWidget = this.moveWidget.bind(this);
    }

    moveWidget = (index, monitor, component) => {
        let widgets = this.state.widgetList;

        widgets[component.index] = widgets.splice(index, 1, widgets[component.index])[0];
        console.log('SWAPPING MATE !!!!');
        this.setState({
            ...this.state,
            widgetList: widgets,
        });
    }

    addWidget(widget) {
        let widgets = this.state.widgetList;
        widgets.push(widget);
        this.setState({
            ...this.state,
            widgetList: widgets
        });
    }

    triggerEdit(e) {
        console.log('zizi');
        e.preventDefault();
        this.setState({
            ...this.state,
            editMode: !this.state.editMode,
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
        let editTrigger = undefined;
        let widgets = [];
        if (this.state.editMode === false) {
            for (let widget of this.state.widgetList) {
                widgets.push(<GridListTile>{widget}</GridListTile>);
            }
        } else {
            let i = 0;
            for (let widget of this.state.widgetList) {
                widgets.push(<GridListTile><DropableZone index={i}  callback={this.moveWidget}><DragableItem index={i} child={widget} /></DropableZone></GridListTile>);
                i++;
            }
        }
        if (this.state.editMode === true) {
            editTrigger =
            (<GridListTile classes={{root: classes.gridListTile}}>
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