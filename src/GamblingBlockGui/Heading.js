import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
// import styles from './GuiTable.scss';

export default class Heading extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (<div><Link to={'/'}>back</Link>{this.props.children}</div>);
  }

}
