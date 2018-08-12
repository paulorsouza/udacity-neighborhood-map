import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Map from '../component/Map';
import Marker from '../component/Marker';

export default class MapContainer extends Component {
  static propTypes = {
    gmap: PropTypes.object.isRequired
  }

  state = {
    bombinhas: {
      lat: -27.151063,
      lng: -48.485371
    }
  }

  renderMarkers = () => {
    const { places } = this.props;
    return places.map(place => this.renderMarker(place));
  }

  renderMarker = (place) => {
    const { gmap, onClick } = this.props;
    return (
      <Marker
        name={place.name}
        lat={place.lat}
        lng={place.lng}
        icon={{
          url: place.icon,
          scaledSize: new gmap.Size(38, 38)
        }}
        onClick={() => onClick(place)}
      />
    );
  }

  render() {
    const { gmap } = this.props;
    const { bombinhas } = this.state;
    return (
      <Map
        gmap={gmap}
        lat={bombinhas.lat}
        lng={bombinhas.lng}
      >
        {this.renderMarkers()}
      </Map>
    );
  }
}
