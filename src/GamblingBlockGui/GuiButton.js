import React, { Component, PropTypes } from 'react';

export default class GuiButton extends Component {
  static propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func
  };

  render() {
    return (<buttonx {...this.props}>{this.props.children}</buttonx>);
  }

}
