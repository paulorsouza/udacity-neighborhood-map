import React, { Component } from 'react';
import GoogleApi from '../hoc/GoogleApi';
import Map from '../component/Map';
import Marker from '../component/Marker';
import InfoWindow from '../component/InfoWindow';

class Main extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false
  };

  onMarkerClick = (props, marker) =>
  this.setState({
    activeMarker: marker,
    selectedPlace: props,
    showingInfoWindow: true
  });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
  });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    const pos = {lat: 37.759703, lng: -122.428093}
    return (
      <div style={style}>
        <Map
          google={this.props.google}
          onClick={this.onMapClicked}
        >
          <Marker
            name="SOMA"
            onClick={this.onMarkerClick}
            position={{ lat: 37.778519, lng: -122.40564 }}
          />

          <Marker
            name="Dolores park"
            onClick={this.onMarkerClick}
            position={{ lat: 37.759703, lng: -122.428093 }}
          />

          <InfoWindow
            marker={this.state.activeMarker}
            onClose={this.onInfoWindowClose}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>

          <InfoWindow position={{ lat: 37.765703, lng: -122.42564 }} visible>
            <small>
              Click on any of the markers to display an additional info.
            </small>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default GoogleApi({
  libraries: ['places']
})(Main)
