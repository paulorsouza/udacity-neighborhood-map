import React, { Component } from 'react';
import GoogleApi from '../hoc/GoogleApi';
import Map from '../component/Map';

class Main extends Component {
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <div style={style}>
        <Map google={this.props.google}
          />
      </div>
    )
  }
}

export default GoogleApi({
  libraries: ['places']
})(Main)
