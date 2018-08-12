import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from './Drawer';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '95vh'
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0
  }
});

class MainPage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.element,
    filterPlaces: PropTypes.func.isRequired,
    filteredPlaces: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    children: <div />
  }

  state = { drawerOpen: false }

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  }

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  }

  render() {
    const {
      classes,
      children,
      filterPlaces,
      filteredPlaces,
      handleClick
    } = this.props;
    const { drawerOpen } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: drawerOpen,
            })}
          >
            <Toolbar disableGutters={!drawerOpen}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={
                  classNames(classes.menuButton, drawerOpen && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                Fireball Beach
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            classes={classes}
            drawerOpen={drawerOpen}
            handleDrawerClose={this.handleDrawerClose}
            filterPlaces={filterPlaces}
            filteredPlaces={filteredPlaces}
            onClick={handleClick}
          />
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: drawerOpen
            })}
          >
            <div className={classes.drawerHeader} />
            {children}
          </main>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainPage);
