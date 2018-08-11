import React, { Component } from 'react';
import createScript from '../util/addGapiScript';
import Map from './Map';
import ResponsiveDialog from '../component/ResponsiveDialog';
import FourSquare from './FourSquare';

export default class App extends Component {
  state = {
    gmap: null,
    loaded: false,
    promise: null,
    info: {
      open: false,
      title: false
    },
    infoStore: new Map()
  }

  componentDidMount() {
    const { promise } = this.state;
    if (!promise) {
      this.setState({ promise: createScript() },
        this.resolvePromise);
    }
  }

  handleClick = (event, name) => {
    const info = {
      open: true,
      title: name
    };
    this.setState({ info });
  }

  handleClose = () => {
    const info = {
      open: false,
      title: ''
    };
    this.setState({ info });
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
    const { loaded, gmap, info } = this.state;
    return (
      <div>
        <ResponsiveDialog
          open={info.open}
          title={info.title}
          onClose={this.handleClose}
        >
          <FourSquare
            place={{
              name: 'Pousada Ganesh',
              lat: -27.1513326,
              lng: -48.4854157,
            }}
          />
        </ResponsiveDialog>
        {!loaded
          ? (
            <div>
              Carregando
            </div>
          )
          : (
            <Map
              gmap={gmap}
              onClick={this.handleClick}
            />
          )
        }
      </div>
    );
  }
}
