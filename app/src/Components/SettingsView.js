import React from 'react';
import ResponsiveDrawer from './Sidebar';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        paddingTop: '100px',
    },
})


class Settings extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <ResponsiveDrawer onEdit={undefined}/>
                <div className={classes.content}>
                    
                </div>
            </div>
        );
    }
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);