import React, { Component, PropTypes } from 'react';
import styles from './Summary.scss';

export default class Summary extends Component {
  static propTypes = {
    value: PropTypes.any,
    sortedSummary: PropTypes.array
  };

  get place() {
    const {value, sortedSummary} = this.props;
    return sortedSummary.indexOf(value) + 1;
  }

  render() {
    return (<span className={styles.wrapper}><small className={styles.place}>{this.place}</small> <span className={styles.data}>{this.props.value}</span></span>);
  }
}
