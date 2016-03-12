import { combineReducers } from 'redux';
import GameDefault from './GameDefault';
import gameDefaultReducers from './GameDefault/reducers';

export const _reducers = combineReducers({
  gameDefault: gameDefaultReducers
});

export default {
  GameDefault
};
