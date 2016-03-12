import React, { Component, PropTypes, Children, cloneElement } from 'react';
import styles from './Row.css';

export default class Row extends Component {
  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    children: PropTypes.object.isRequired,
    cols: PropTypes.arrayOf(PropTypes.any).isRequired
  };

  renderValue(player, value) {
    return Children.map(this.props.children, function (child) {
      return cloneElement(child, {player, value});
    });
  }

  render() {
    let cols = this.props.cols.map((col, idx) => {
      return <td className={styles.col} key={idx}>{this.renderValue(idx, col)}</td>;
    });

    return <tr>
      <th className={styles.head}>{this.props.title}</th>
      {cols}
    </tr>;
  }

};
