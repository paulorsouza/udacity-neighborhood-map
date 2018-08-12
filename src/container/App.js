import React, { Component } from 'react';
import createScript from '../util/addGapiScript';
import Map from './Map';
import ResponsiveDialog from '../component/ResponsiveDialog';
import FourSquare from './FourSquare';
import places from '../util/places';
import MainPage from '../component/MainPage';

export default class App extends Component {
  state = {
    gmap: null,
    loaded: false,
    promise: null,
    open: false,
    filteredPlaces: places,
    currentPlace: {}
  }

  componentDidMount() {
    const { promise } = this.state;
    if (!promise) {
      this.setState({ promise: createScript() },
        this.resolvePromise);
    }
  }

  handleClick = (place) => {
    this.setState({ open: true, currentPlace: place });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  resolvePromise = () => {
    const { promise } = this.state;
    promise
      .then(this.initMap)
      .catch(this.loadMapError);
  }

  initMap = () => {
    this.setState({
      loaded: true,
      gmap: window.google.maps
    });
  }

  loadMapError = (event) => {
    console.log(event);
  }

  render() {
    const {
      loaded, gmap, open, filteredPlaces, currentPlace
    } = this.state;
    return (
      <div>
        <ResponsiveDialog
          open={open}
          title={currentPlace.name}
          onClose={this.handleClose}
        >
          <FourSquare
            place={currentPlace}
          />
        </ResponsiveDialog>
        {!loaded
          ? (
            <div>
              Carregando
            </div>
          )
          : (
            <MainPage>
              <Map
                gmap={gmap}
                onClick={this.handleClick}
                places={filteredPlaces}
              />
            </MainPage>
          )
          }
      </div>
    );
  }
}
