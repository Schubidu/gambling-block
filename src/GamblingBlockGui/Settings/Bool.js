import React, { Component, PropTypes } from 'react';

export default class Bool extends Component {
  static propTypes = {
    value: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired
  };

  render() {
    return (<div ></div>);
  }

}
