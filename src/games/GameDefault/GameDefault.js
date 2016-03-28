import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Gui from '../../GamblingBlockGui';
import * as actions from './actions';

export default class GameDefault extends Component {
  static propTypes = {
    players: PropTypes.arrayOf(PropTypes.string),
    rounds: PropTypes.arrayOf(PropTypes.array),
    settings: React.PropTypes.shape({
      highestWins: React.PropTypes.bool,
      target: React.PropTypes.number
    }),
    init: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.init(this.props.players.length);
  }

  onAddRound(players) {
    this.props.add(players);
  }

  onEditRound(round, player, value) {
    this.props.edit(round, player, value);
  }

  render() {
    const {rounds, players, settings} = this.props;

    const summary = rounds.reduce((carry, round) => {
      round.forEach((col, idx) => {
        if (!carry[idx]) {
          carry[idx] = 0;
        }
        carry[idx] += col * 1;
      });

      return carry;
    }, []);

    // clone array
    const sortedSummary = summary.slice(0);
    sortedSummary.sort((a, b) => {
      if (settings.highestWins) {
        return b - a;
      } else {
        return a - b;
      }
    });

    const rows = rounds.map((round, idx) => {
      return (<Gui.Row key={idx} title={idx + 1} cols={round}>
        <Gui.Input onChange={this.onEditRound.bind(this, idx)}/>
      </Gui.Row>);
    });

    return (<Gui.Wrapper>
      <Gui.Heading><Gui.Settings settings={GameDefault.propTypes.settings}/></Gui.Heading>
      <Gui.Table>
        <Gui.TableHeader>
          <Gui.Row key='header' title='Rounds' cols={players}>
            <Gui.Text/>
          </Gui.Row>
        </Gui.TableHeader>
        <Gui.TableBody>
          {rows}
        </Gui.TableBody>
        <Gui.TableFooter>
          <Gui.Row key='summary' title='Summary' cols={summary}>
            <Gui.Summary sortedSummary={sortedSummary}/>
          </Gui.Row>
        </Gui.TableFooter>
      </Gui.Table>
      <Gui.Button onClick={this.onAddRound.bind(this, players.length)}>New Round</Gui.Button>
    </Gui.Wrapper>);
  }
};

export default connect(null, {...actions})(GameDefault);
