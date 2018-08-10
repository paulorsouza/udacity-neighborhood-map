import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Marker extends Component {
  static propTypes = {
    gmap: PropTypes.object,
    mapInstance: PropTypes.object,
    lat: PropTypes.number,
    lng: PropTypes.number,
    name: PropTypes.string,
    icon: PropTypes.object
  }

  static defaultProps = {
    gmap: null,
    mapInstance: null,
    lat: 0,
    lng: 0,
    name: '',
    icon: null
  }

  componentDidMount() {
    const {
      gmap, mapInstance, name, lat, lng, icon
    } = this.props;
    const position = new gmap.LatLng(lat, lng);
    let options = {
      map: mapInstance,
      position,
      name
    };
    if (icon) {
      options = { ...options, icon };
    }
    this.marker = new gmap.Marker({ ...options });
  }

  render() {
    return null;
  }
}
