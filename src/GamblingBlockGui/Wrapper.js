import React, { Component, PropTypes } from 'react';

export default class Wrapper extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (<div>{this.props.children}</div>);
  }

}
