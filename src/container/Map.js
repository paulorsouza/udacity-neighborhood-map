import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Map from '../component/Map';
import Marker from '../component/Marker';
import icons from '../util/icons';

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
    const { gmap, onClick } = this.props;
    const { bombinhas } = this.state;
    return (
      <Map
        gmap={gmap}
        lat={bombinhas.lat}
        lng={bombinhas.lng}
      >
        <Marker
          name="Pousada Ganesh"
          lat={-27.1513326}
          lng={-48.4854157}
          icon={{
            url: icons.bed,
            scaledSize: new gmap.Size(38, 38)
          }}
          onClick={onClick}
        />
        <Marker
          name="Sushi Bar Ganesh"
          lat={-27.1510912}
          lng={-48.4852396}
          icon={{
            url: icons.sushi,
            scaledSize: new gmap.Size(32, 32)
          }}
        />
        <Marker
          name="João Sorveteria"
          lat={-27.1493531}
          lng={-48.4871171}
          icon={{
            url: icons.iceCream,
            scaledSize: new gmap.Size(32, 32)
          }}
          onClick={onClick}
        />
        <Marker
          name="Super Mercado Bombinhas"
          lat={-27.1488612}
          lng={-48.4836138}
          icon={{
            url: icons.cart,
            scaledSize: new gmap.Size(32, 32)
          }}
          onClick={onClick}
        />
        <Marker
          name="Pousada Canto das Trilhas"
          lat={-27.1448554}
          lng={-48.5046959}
          icon={{
            url: icons.cabin,
            scaledSize: new gmap.Size(40, 40)
          }}
          onClick={onClick}
        />
        <Marker
          name="Pousada Bomar Bombinhas"
          lat={-27.1493531}
          lng={-48.4871171}
          icon={{
            url: icons.hotel,
            scaledSize: new gmap.Size(32, 32)
          }}
          onClick={onClick}
        />
        <Marker
          name="Olímpio"
          lat={-27.1458787}
          lng={-48.5014784}
          icon={{
            url: icons.food,
            scaledSize: new gmap.Size(38, 38)
          }}
          onClick={onClick}
        />
        <Marker
          name="Apart Hotel"
          lat={-27.1397874}
          lng={-48.5101237}
          icon={{
            url: icons.hotel,
            scaledSize: new gmap.Size(32, 32)
          }}
          onClick={onClick}
        />
        <Marker
          name="Armazém quatro ilhas"
          lat={-27.151553}
          lng={-48.486435}
          icon={{
            url: icons.cart,
            scaledSize: new gmap.Size(32, 32)
          }}
          onClick={onClick}
        />
      </Map>
    );
  }
}
