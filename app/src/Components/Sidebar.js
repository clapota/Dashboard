import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import EditIcon from '@material-ui/icons/Edit';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import Home from '@material-ui/icons/Home';
import Settings from '@material-ui/icons/Settings';
import {Link} from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: '#545BD9',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },

  menuButton: {
    color: 'white',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  addButton: {
    marginLeft: theme.spacing(2),
    color: 'white',
  },

  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#273756',
    boxShadow: '2px 2px 20px 1px rgba(80, 80, 80, 1)'
  },
  link: {
    color: 'white',
    fontWeight: 800,
  },
  icon: {
    color: 'white',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    color: 'white',
    letterSpacing: 4,
    fontWeight: 800,
  },
  toolbarApp: {
    justifyContent: 'space-between',
  }
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <Link to="/">
          <ListItem button>
              <ListItemIcon classes={{root: classes.icon}}><Home/></ListItemIcon>
              <ListItemText classes={{root: classes.link}} primary="HOME" />
          </ListItem>
        </Link>
        <Link to="/settings" >
          <ListItem button>
              <ListItemIcon classes={{root: classes.icon}}><Settings/></ListItemIcon>
              <ListItemText classes={{root: classes.link}} primary="SETTINGS" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
  let button = undefined;

  if (props.onEdit !== undefined) {
    button = (
      <IconButton
        color="inherit"
        aria-label="modify dashboard"
        edge="end"
        onClick={e => props.onEdit(e)}
        className={classes.addButton}
      >
        <EditIcon />
      </IconButton>
    );
  }


  return (
    <>
    <AppBar position="fixed" className={classes.appBar}>
        <Toolbar classes={{root: classes.toolbarApp}}>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
        >
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap classes={{root: classes.title}}>
            DASHBOARD
        </Typography>
        {button}
        </Toolbar>
    </AppBar>
    <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
        <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
        >
            {drawer}
        </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
        <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
        >
            {drawer}
        </Drawer>
        </Hidden>
    </nav>
    </>
    );
}

export default ResponsiveDrawer;