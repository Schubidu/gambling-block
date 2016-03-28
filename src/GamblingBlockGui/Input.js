import React, { Component, PropTypes } from 'react';
import styles from './Input.scss';

const InputTypeNumber = 'number';
const InputTypeText = 'text';

export default class Input extends Component {
  static propTypes = {
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    player: PropTypes.number,
    type: React.PropTypes.oneOf([InputTypeText, InputTypeNumber]),
    onChange: PropTypes.func
  };

  static defaultProps = {
    type: InputTypeNumber
  };

  handleFocus(event) {
    const t = event.target;
    event.target.select();
    setTimeout(() => {
      t.setSelectionRange(0, 9999);
    }, 1);
  }

  handleChange(event) {
    this.props.onChange(this.props.player, event.target.value);
  }

  render() {
    return <input className={(this.props.type === InputTypeNumber) ? styles.number : styles.normal} type={this.props.type} {...this.props} {...this.state} onFocus={this.handleFocus.bind(this)} onChange={this.handleChange.bind(this)}/>;
  }

}
