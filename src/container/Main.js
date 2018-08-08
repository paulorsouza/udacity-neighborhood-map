import React, { Component } from 'react';
import GoogleApi from '../hoc/GoogleApi';
import Map from '../component/Map';
import Marker from '../component/Marker';

class Main extends Component {
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    const pos = {lat: 37.759703, lng: -122.428093}
    return (
      <div style={style}>
        <Map google={this.props.google}>
          <Marker />
          <Marker position={pos} />
        </Map>
      </div>
    )
  }
}

export default GoogleApi({
  libraries: ['places']
})(Main)
