import React, { Component } from 'react';
import Map from '../component/Map';

export default class MapContainer extends Component {
  render() {
    return(
      <Map
        gmap={this.props.gmap}
        lat="-27.151063"
        lng="-48.485371"
      />
    )
  }
}
