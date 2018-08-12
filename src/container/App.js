import React, { Component } from 'react';
import createScript from '../util/addGapiScript';
import Map from './Map';
import ResponsiveDialog from '../component/ResponsiveDialog';
import FourSquare from './FourSquare';
import places from '../util/places';
import AppFrame from '../component/AppFrame';
import Message from '../component/Message';

export default class App extends Component {
  state = {
    gmap: null,
    loaded: false,
    promise: null,
    open: false,
    filteredPlaces: places,
    currentPlace: {},
    messages: []
  }

  componentDidMount() {
    const { promise } = this.state;
    if (!promise) {
      this.setState({ promise: createScript() },
        this.resolvePromise);
    }
  }

  filterPlaces = (value) => {
    const filteredPlaces = places.filter((place) => {
      return place.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });
    this.setState({ filteredPlaces });
  }

  handleClick = (place) => {
    this.setState({ open: true, currentPlace: place });
  }

  handleClose = () => {
    this.setState({ open: false, currentPlace: {} });
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
    this.addMessage(event, 'error');
  }

  addMessage = (msg, variant) => {
    const { messages } = this.state;
    const newMessages = [...messages, {
      msg, variant
    }];
    this.setState({ messages: newMessages });
  }

  renderMessages = () => {
    const { messages } = this.state;
    if (messages.length > 0) {
      return messages.map((message) => {
        const handleMessageClose = () => {
          const msgs = messages.filter(
            m => message.msg !== m.message
          );
          console.log(msgs);
          this.setState({ messages: msgs });
        };
        return (
          <Message
            message={message.msg}
            variant={message.variant}
            handleClose={handleMessageClose}
          />
        );
      });
    }
    return null;
  }

  render() {
    const {
      loaded, gmap, open, filteredPlaces, currentPlace
    } = this.state;
    return (
      <div>
        {this.renderMessages()}
        <ResponsiveDialog
          open={open}
          title={currentPlace.name}
          onClose={this.handleClose}
        >
          <FourSquare
            place={currentPlace}
            addMessage={this.addMessage}
          />
        </ResponsiveDialog>
        {!loaded
          ? (
            <div>
              Carregando
            </div>
          )
          : (
            <AppFrame
              filterPlaces={this.filterPlaces}
              filteredPlaces={filteredPlaces}
              handleClick={this.handleClick}
            >
              <Map
                gmap={gmap}
                onClick={this.handleClick}
                places={filteredPlaces}
                currentPlace={currentPlace}
              />
            </AppFrame>
          )
          }
      </div>
    );
  }
}
