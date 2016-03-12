import React, { Component, PropTypes } from 'react';

export default class GuiTable extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (<table>{this.props.children}</table>);
  }

}
