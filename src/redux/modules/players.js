import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const PLAYER_INIT = 'PLAYER_INIT';
export const PLAYER_ADD = 'PLAYER_ADD';
export const PLAYER_ADD_GAME = 'PLAYER_ADD_GAME';
export const PLAYER_EDIT = 'PLAYER_EDIT';
export const PLAYER_DELETE = 'PLAYER_DELETE';

// ------------------------------------
// Actions
// ------------------------------------

/**
 * add new round
 * @param {string} player
 * @returns {{type, payload: {player: string}}}
 */
export const add = createAction(PLAYER_ADD, (player = '') => player);

/**
 * edit players value
 * @param {number} player
 * @param {string} name
 * @returns {{type, payload: {player: number, name: string}}}
 */
export const edit = createAction(PLAYER_EDIT, (player, name) => ({player, name}));

/**
 * delete a player
 * @param {number} player
 * @returns {{type, payload: {player: number}}}
 */
export const erase = createAction(PLAYER_DELETE, (player) => player);

export const actions = {
  add,
  edit,
  erase
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [PLAYER_ADD]: (state, { payload }) => [...state, payload],
  [PLAYER_EDIT]: (state, { payload }) => {
    const {player, name} = payload;
    state[player] = name;
    return [...state];
  },
  [PLAYER_DELETE]: (state, { payload }) => {
    state[payload] = null;
    const s = state.reduce((carry, p, i) => {
      console.log(i);
      if (p !== null) {
        carry.push(p);
      }
      return carry;
    }, []);
    return s.splice(0);
  }
}, []);
