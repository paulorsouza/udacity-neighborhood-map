import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Map extends Component {
  componentDidMount() {
    const { gmap, lat, lng } = this.props;
    const center = new gmap.LatLng(lat, lng);
    console.log(center);
    const settings = {
      center,
      zoom: 15
    }
    console.log(this.mapDiv);
    const node = ReactDOM.findDOMNode(this.mapDiv);
    const map = new gmap.Map(this.mapDiv, settings);
  }

  render() {
    return(
      <div>
        <div
          style={{ width: "100vw", height: "100vh" }}
          ref={div => this.mapDiv = div}
        >
          Loading
        </div>
      </div>
    )
  }
}
