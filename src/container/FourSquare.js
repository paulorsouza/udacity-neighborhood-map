import React, { Component } from 'react';
import qs from 'qs';

const CLIENT_ID = 'ZVR3MJ0VVO0AKFVBVERXJMY1HRJKQFCKPP21RTSLGYQUM4MP';
const CLIENT_SECRET = 'Y51AOLBECTT0NJ3WSP11WWSHQRW4J3AEZVVBOE44NC0PKFJ2';
const VERSION = '20180323';
const BASE_URL = 'https://api.foursquare.com/v2';
const CREDENTIALS = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  v: VERSION
};

export default class FourSquare extends Component {
  state = {
    placeData: {}
  }

  componentDidMount() {
    const { place } = this.props;
    let placeData = {};
    this.search(place)
      .then(res => res.json())
      .then((data) => {
        placeData = this.normalizeInfo(data);
        return Promise.all(
          [
            this.getPhoto(placeData.id),
            this.getLinks(placeData.id),
            this.getTips(placeData.id)
          ]
        );
      })
      .then(([res1, res2, res3]) => {
        return Promise.all(
          [
            res1.json(),
            res2.json(),
            res3.json()
          ]
        );
      })
      .then(([photo, links, tips]) => {
        console.log(photo);
        console.log(links);
        console.log(tips);
        this.setState({ placeData });
      });
  }

  getPhoto = (id) => {
    const params = { ...CREDENTIALS, limit: 1, group: 'venue' };
    const url = `${BASE_URL}/venues/${id}/photos?${qs.stringify(params)}`;
    return fetch(url);
  }

  getLinks = (id) => {
    const url = `${BASE_URL}/venues/${id}/links?${qs.stringify(CREDENTIALS)}`;
    return fetch(url);
  }

  getTips = (id) => {
    const url = `${BASE_URL}/venues/${id}/tips?${qs.stringify(CREDENTIALS)}`;
    return fetch(url);
  }

  normalizeInfo = (data) => {
    const info = data.response.venues[0];
    const { id, name, location } = info;
    const { address } = location;
    return { id, name, address };
  }

  search = (place) => {
    const params = {
      ...CREDENTIALS,
      name: place.name,
      ll: `${place.lat},${place.lng}`,
      intent: 'match'
    };
    const url = `${BASE_URL}/venues/search?${qs.stringify(params)}`;
    return fetch(url);
  }

  render() {
    const { placeData } = this.state;
    const { name, address } = placeData;
    return (
      <div>
        {name}
        <p />
        {address}
      </div>
    );
  }
}
