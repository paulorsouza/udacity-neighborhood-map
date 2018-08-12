import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchRounded from '@material-ui/icons/SearchRounded';

class CustomDrawer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    drawerOpen: PropTypes.bool.isRequired,
    handleDrawerClose: PropTypes.func.isRequired,
    filterPlaces: PropTypes.func.isRequired
  };

  state = {
    searchValue: ''
  }

  normalizePlaces = () => {
    return [1, 2, 3, 4];
  }

  handleSearch = (e) => {
    const { filterPlaces } = this.props;
    this.setState({ searchValue: e.target.value }, () => {
      const { searchValue } = this.state;
      filterPlaces(searchValue);
    });
  }

  render() {
    const {
      classes, drawerOpen, handleDrawerClose
    } = this.props;
    const { searchValue } = this.state;
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
        <FormControl>
          <InputLabel htmlFor="search">
            Search
          </InputLabel>
          <Input
            id="search"
            endAdornment={(
              <InputAdornment position="end">
                <SearchRounded />
              </InputAdornment>
            )}
            onChange={this.handleSearch}
            value={searchValue}
          />
        </FormControl>
        <Divider />
        <List>
          { this.normalizePlaces() }
        </List>
      </Drawer>
    );
  }
}

export default CustomDrawer;
