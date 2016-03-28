import React, { Component, PropTypes } from 'react';
import styles from './Table.scss';

export default class Table extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (<table className={styles.table} >{this.props.children}</table>);
  }

}
