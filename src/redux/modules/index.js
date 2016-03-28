import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import players from '../../players';
import {_reducers as games} from '../../games/games';

export default combineReducers({
  players,
  games,
  router: routeReducer
});
