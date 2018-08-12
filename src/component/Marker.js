import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Marker extends Component {
  static propTypes = {
    gmap: PropTypes.object,
    mapInstance: PropTypes.object,
    lat: PropTypes.number,
    lng: PropTypes.number,
    name: PropTypes.string,
    icon: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    placeInFocus: PropTypes.string
  }

  static defaultProps = {
    gmap: null,
    mapInstance: null,
    lat: 0,
    lng: 0,
    name: '',
    icon: null,
    placeInFocus: ''
  }

  componentDidMount() {
    const {
      gmap, mapInstance, name, lat, lng, icon, onClick
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
    this.marker.addListener('click', onClick);
  }

  componentWillReceiveProps(nextProps) {
    const { placeInFocus, name } = nextProps;
    if (placeInFocus === name) this.bouce();
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  bouce = () => {
    const { gmap } = this.props;
    this.marker.setAnimation(gmap.Animation.BOUNCE);
    setTimeout(() => this.marker.setAnimation(null), 600);
  }

  render() {
    return null;
  }
}
