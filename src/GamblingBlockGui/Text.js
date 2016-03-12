import React, { Component, PropTypes } from 'react';

export default class Text extends Component {
  static propTypes = {
    value: PropTypes.any
  };

  render() {
    return (<span>{this.props.value}</span>);
  }

}
