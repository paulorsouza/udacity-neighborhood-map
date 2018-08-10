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

  render() {
    const { gmap } = this.props;
    const { bombinhas } = this.state;
    return (
      <Map
        gmap={gmap}
        lat={bombinhas.lat}
        lng={bombinhas.lng}
      >
        <Marker
          name="Dolores park"
          lat={-27.151063}
          lng={-48.485371}
        />
      </Map>
    );
  }
}
