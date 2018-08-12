import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Map extends Component {
  static propTypes = {
    gmap: PropTypes.object.isRequired,
    lat: PropTypes.number,
    lng: PropTypes.number,
    children: PropTypes.any
  }

  static defaultProps = {
    lat: 0,
    lng: 0,
    children: null
  }

  state = {
    mapInstance: null
  }

  componentDidMount() {
    const { gmap, lat, lng } = this.props;
    const center = new gmap.LatLng(lat, lng);
    const settings = {
      center,
      zoom: 15
    };
    const map = new gmap.Map(this.mapDiv, settings);
    this.setState({ mapInstance: map });
  }

  renderChildren = () => {
    const { children, gmap } = this.props;
    const { mapInstance } = this.state;
    console.log(children);
    if (!children) return <div />;

    return React.Children.map(children, (c) => {
      if (!c) return <div />;
      console.log(mapInstance);
      return React.cloneElement(c, {
        mapInstance,
        gmap
      });
    });
  }


  render() {
    const { mapInstance } = this.state;
    return (
      <div>
        <div
          style={{ height: '85vh' }}
          ref={(div) => { this.mapDiv = div; }}
        >
          Loading
        </div>
        {mapInstance && this.renderChildren()}
      </div>
    );
  }
}
