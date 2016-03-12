import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import gameObjects from '../games/games';
import { Link } from 'react-router';

function first2Upper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const mapStateToProps = (state) => ({
  players: state.players,
  games: state.games
});

export class Game extends Component {
  static propTypes = {
    params: PropTypes.object,
    games: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired
  };

  render() {
    const chosenGame = this.props.params.chosenGame;
    const { games, players } = this.props;

    if (!players.length) {
      return (<div><p>No match found.</p>
        <p><Link to={'/'}>Start new match</Link></p>
      </div>);
    }

    return React.createElement(gameObjects[first2Upper(chosenGame)], {...games[chosenGame], players});
  }
}

export default connect(mapStateToProps)(Game);

