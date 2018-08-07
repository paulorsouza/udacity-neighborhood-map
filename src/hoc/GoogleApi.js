/** From
 * https://gist.githubusercontent.com/auser/1d55aa3897f15d17caf21dc39b85b663/raw/9e2fab5d6682456c09fdfb42899d5a9c0de0810b/GoogleApiComponent.js
 */

import React, { Component } from 'react';

import ScriptCache from '../util/ScriptCache';
import { makeUrl } from '../util/Script';

const scriptCache = new ScriptCache()

const serialize = obj => JSON.stringify(obj);
const isSame = (a, b) => a === b || serialize(a) === serialize(b);
const normalizeInput = (input, props) => {
  if(typeof input === 'function') return input(props);
  return input;
}

const createCache = options => {
  const { libraries } = options.libraries;

  return scriptCache.scripts({
    google: makeUrl({ libraries })
  });
};

const LoadingContainer = props => <div>Loading...</div>;

const wrapper = input => WrappedComponent => {
  class Wrapper extends Component {
    constructor(props, context) {
      super(props, context);
      const options = normalizeInput(input, props);
      this.initialize(options);

      this.state = {
        loaded: false,
        map: null,
        google: null,
        options
      }
    }

    componentWillReceiveProps(props) {
      if (typeof input !== 'function') return;
      const statedOptions = this.state.options;
      const options = normalizeInput(input, props);
      if (isSame(options, statedOptions)) return;
      this.initialize(options)
      this.setState({
        options, loaded: false, google: null
      });
    }

    initialize = (options) => {
      if (this.unregisterLoadHandler) {
        this.unregisterLoadHandler();
        this.unregisterLoadHandler = null;
      }
      this.scriptCache = createCache(options);
      this.unregisterLoadHandler =
        this.scriptCache.google.onLoad(this.onLoad);
    }

    onLoad = (err, tag) => {
      console.log('teste');
      this.gapi = window.google;
      this.setState({ loaded: true, google: this.gapi });
    }

    render() {
      const isTest = this.state.options
        ? this.state.options.isTest
        : false;
      if (!this.state.loaded && !isTest) {
        return <LoadingContainer />;
      }

      const props = {
        ...this.props,
        loaded: this.state.loaded,
        google: window.google
      };

      console.log(props);

      return (
        <div>
          <WrappedComponent {...props} />
          <div ref="map" />
        </div>
      );
    }
  }
  return Wrapper;
};

export default wrapper;
