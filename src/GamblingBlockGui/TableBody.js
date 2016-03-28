import React, { Component, PropTypes } from 'react';

export default class TableBody extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (<tbody>{this.props.children}</tbody>);
  }

}
