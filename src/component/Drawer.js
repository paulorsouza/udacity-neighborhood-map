import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

class CustomDrawer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    drawerOpen: PropTypes.bool.isRequired,
    handleDrawerClose: PropTypes.func.isRequired
  };

  normalizePlaces = () => {
    return [1, 2, 3, 4];
  }

  render() {
    const {
      classes, drawerOpen, handleDrawerClose
    } = this.props;

    return (
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
          Search places
        <Divider />
        <List>
          { this.normalizePlaces() }
        </List>
      </Drawer>
    );
  }
}

export default CustomDrawer;
