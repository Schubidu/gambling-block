import React, { Component, PropTypes } from 'react';

export default class GuiTableHeader extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (<thead>{this.props.children}</thead>);
  }

}
