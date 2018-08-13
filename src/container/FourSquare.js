import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import TipCard from '../component/TipCard';

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
  static propTypes = {
    place: PropTypes.object.isRequired,
    addMessage: PropTypes.func.isRequired
  }

  state = {
    placeData: {},
    tips: []
  }

  componentDidMount() {
    const { place, addMessage } = this.props;
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
        const normalizedTips = this.normalizeTips(tips);
        this.setState({ placeData, tips: normalizedTips });
      })
      .catch((e) => {
        addMessage(e.message, 'error');
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

  normalizeMeta = (data) => {
    const { code, errorDetail } = data.meta;
    if (code !== 200) {
      throw new Error(`${code}- ${errorDetail}`);
    }
  }

  normalizeInfo = (data) => {
    this.normalizeMeta(data);
    const info = data.response.venues[0];
    if (!info) {
      throw new Error('This location does not exist on Foursquare');
    }
    const { id, name, location } = info;
    const { address } = location;
    return { id, name, address };
  }

  normalizeTips = (data) => {
    this.normalizeMeta(data);
    const { count, items } = data.response.tips;
    if (count === 0) return [];
    return items.map((item) => {
      const { firstName, lastName } = item.user;
      return {
        link: item.canonicalUrl,
        text: item.text,
        user: `${firstName} ${lastName}`
      };
    });
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

  renderTips = () => {
    const { tips } = this.state;
    if (tips.length === 0) {
      return (
        <TipCard
          text="Without tips"
        />
      );
    }
    return tips.map((tip) => {
      return (
        <TipCard
          user={tip.user}
          link={tip.user}
          text={tip.text}
        />
      );
    });
  }

  render() {
    const { placeData } = this.state;
    const { name, address } = placeData;
    return (
      <div>
        {!name ? (
          <LinearProgress
            color="secondary"
          />) : (
            <div>
              <Typography component="p">
                {address}
              </Typography>
              <p />
              {this.renderTips()}
            </div>)
        }
      </div>
    );
  }
}
