import React, { Component, PropTypes } from 'react';
import { GuiButton, GuiTable, GuiTableBody, GuiTableFooter, GuiTableHeader, GuiInput, GuiRow, GuiSummary, GuiText, GuiWrapper } from '../../GamblingBlockGui';
import { connect } from 'react-redux';
import * as actions from './actions';

export default class GameDefault extends Component {
  static propTypes = {
    players: PropTypes.arrayOf(PropTypes.string),
    rounds: PropTypes.arrayOf(PropTypes.array),
    settings: PropTypes.object,
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
      return (<GuiRow key={idx} title={idx + 1} cols={round}>
        <GuiInput onChange={this.onEditRound.bind(this, idx)}/>
      </GuiRow>);
    });

    return (<GuiWrapper>
      <GuiTable>
        <GuiTableHeader>
          <GuiRow key='header' title='Rounds' cols={players}>
            <GuiText/>
          </GuiRow>
        </GuiTableHeader>
        <GuiTableBody>
          {rows}
        </GuiTableBody>
        <GuiTableFooter>
          <GuiRow key='summary' title='Summary' cols={summary}>
            <GuiSummary sortedSummary={sortedSummary}/>
          </GuiRow>
        </GuiTableFooter>
      </GuiTable>
      <GuiButton onClick={this.onAddRound.bind(this, players.length)}>New Round</GuiButton>
    </GuiWrapper>);
  }
};

export default connect(null, {...actions})(GameDefault);
