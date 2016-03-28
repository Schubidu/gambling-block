import React, { Component, PropTypes } from 'react';

export default class TableFooter extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (<tfoot>{this.props.children}</tfoot>);
  }

}
