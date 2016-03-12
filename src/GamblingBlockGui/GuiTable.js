import React, { Component, PropTypes } from 'react';
import styles from './GuiTable.scss';

export default class GuiTable extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (<table className={styles.guiTable} >{this.props.children}</table>);
  }

}
