import React, { Component, PropTypes } from 'react';

export default class GuiTableFooter extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (<tfoot>{this.props.children}</tfoot>);
  }

}
