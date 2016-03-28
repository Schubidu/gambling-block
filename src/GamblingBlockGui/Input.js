import React, { Component, PropTypes } from 'react';
import styles from './Input.scss';

const InputTypeNumber = 'number';
const InputTypeText = 'text';

export default class Input extends Component {
  static propTypes = {
    value: PropTypes.any,
    player: PropTypes.number,
    type: React.PropTypes.oneOf([InputTypeText, InputTypeNumber]),
    onChange: PropTypes.func
  };

  static defaultProps = {
    type: InputTypeNumber
  };

  handleFocus(event) {
    event.target.select();
  }

  handleChange(event) {
    this.props.onChange(this.props.player, event.target.value);
  }

  render() {
    return <input className={(this.props.type === InputTypeNumber) ? styles.number : styles.normal} type={this.props.type} defaultValue={this.props.value} {...this.state} onFocus={this.handleFocus.bind(this)} onChange={this.handleChange.bind(this)}/>;
  }

}
