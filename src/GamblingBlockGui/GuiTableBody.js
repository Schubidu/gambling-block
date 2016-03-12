import React, { Component, PropTypes } from 'react';

export default class GuiTableBody extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (<tbody>{this.props.children}</tbody>);
  }

}
