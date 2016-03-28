import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { actions as playersActions } from '../players/reducers';
import Input from '../GamblingBlockGui/Input';
import styles from './PlayersView.scss';

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  players: state.players,
  games: state.games
});
export class PlayersView extends React.Component {
  static propTypes = {
    players: PropTypes.arrayOf(React.PropTypes.string.isRequired),
    games: PropTypes.object.isRequired,
    add: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    erase: PropTypes.func.isRequired
  };

  componentWillMount() {
    if (!this.props.players.length) {
      this.props.add('Player 1');
      this.props.add('Player 2');
    }
  }

  onDeletePlayer(i) {
    this.props.erase(i);
    this.forceUpdate();
  }

  onAddPlayer() {
    this.props.add();
  }

  onChangePlayer(player, value) {
    this.props.edit(player, value);
  }

  player(name, i) {
    return (<p key={i} className='pure-control-group player'><label>Player {i + 1} <Input type='text' player={i} value={name} onChange={this.onChangePlayer.bind(this)}/></label>
      <button onClick={this.onDeletePlayer.bind(this, i)}>Delete</button>
    </p>);
  }

  render() {
    const { players, games } = this.props;
    const renderedPlayers = (players && players.length) ? players.map(this.player.bind(this)) : null;

    return (<div><h2>Choose Player</h2>
      {renderedPlayers}
      <button className={styles.button} onClick={this.onAddPlayer.bind(this)}>Add Player</button>
      <h2>Start Game</h2>
      {Object.keys(games).map((key) => {
        return (<Link key={key} to={'/game/' + key}>{key}</Link>);
      })}

    </div>);
  }
}

export default connect(mapStateToProps, playersActions)(PlayersView);
