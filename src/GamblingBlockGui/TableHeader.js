import React, { Component, PropTypes } from 'react';

export default class TableHeader extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (<thead>{this.props.children}</thead>);
  }

}
