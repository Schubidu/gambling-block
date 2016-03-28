import { combineReducers } from 'redux';
import { DEFAULT_INIT, DEFAULT_ADD, DEFAULT_EDIT, DEFAULT_RULES } from './actions';

const initialState = {
  rounds: [],
  rules: {
    highestWins: false,
    target: 1000
  }
};

function initColumns(players = 1, value = 0) {
  const columns = [];
  for (let i = 0; i < players; i++) {
    columns.push(value);
  }
  return columns;
}

function settings(state = initialState.rules, action) {
  if (action.type === DEFAULT_RULES) {
    return {...state, ...action.payload.options};
  }
  return state;
}

function rounds(state = initialState.rounds, action) {
  const players = (action.payload && action.payload.players) ? action.payload.players : undefined;
  switch (action.type) {
    case DEFAULT_INIT:
      return [initColumns(players, [0])];
    case DEFAULT_ADD:
      return [...state, initColumns(players, [0])];
    case DEFAULT_EDIT:
      const rounds = state;
      const round = action.payload.round;
      const player = action.payload.player;
      const value = action.payload.value;
      rounds[round][player] = value;
      return [...rounds];
    default:
      return state;
  }
}

export default combineReducers({
  settings, rounds
});
