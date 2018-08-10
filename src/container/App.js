import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { createScript } from '../util/GApi';
import Map from './Map';

export default class App extends Component {
  state = {
    gmap: null,
    loaded: false,
    promise: null
  }

  componentDidMount() {
    if (!this.state.promise) {
      this.setState({ promise: createScript() },
        () => {
          this.state.promise
            .then(this.initMap)
            .catch(this.loadMapError)
      });
    }
  }

  initMap = () => {
    console.log('teste');
    console.log(window.google);
    this.setState({
      loaded: true,
      gmap: window.google.maps
    })
  }

  loadMapError = (event) => {
    console.log(event);
  }

  render() {
    return (
      <div>
        {!this.state.loaded
          ? <div>Carregando</div>
          : <Map
              gmap={this.state.gmap}
            />}
      </div>
    );
  }
}
