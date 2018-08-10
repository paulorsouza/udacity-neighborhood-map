import React, { Component } from 'react';
import createScript from '../util/addGapiScript';
import Map from './Map';

export default class App extends Component {
  state = {
    gmap: null,
    loaded: false,
    promise: null
  }

  componentDidMount() {
    const { promise } = this.state;
    if (!promise) {
      this.setState({ promise: createScript() },
        this.resolvePromise);
    }
  }

  resolvePromise = () => {
    const { promise } = this.state;
    promise
      .then(this.initMap)
      .catch(this.loadMapError);
  }

  initMap = () => {
    this.setState({
      loaded: true,
      gmap: window.google.maps
    });
  }

  loadMapError = (event) => {
    console.log(event);
  }

  render() {
    const { loaded, gmap } = this.state;
    return (
      <div>
        {!loaded
          ? (
            <div>
              Carregando
            </div>
          )
          : (
            <Map gmap={gmap} />
          )
        }
      </div>
    );
  }
}
