export const DEFAULT_INIT = 'GAME/DEFAULT_INIT';
export const DEFAULT_ADD = 'GAME/DEFAULT_ADD';
export const DEFAULT_EDIT = 'GAME/DEFAULT_EDIT';
export const DEFAULT_RULES = 'GAME/DEFAULT_RULES';

/**
 * initialise the game
 * @param {number} players
 * @returns {{type, payload: {players: number}}}
 */
export function init(players = 2) {
  return {
    type: DEFAULT_INIT,
    payload: {
      players
    }
  };
}

/**
 * add new round
 * @param {number} players
 * @returns {{type, payload: {players: number}}}
 */
export function add(players = 2) {
  return {
    type: DEFAULT_ADD,
    payload: {
      players
    }
  };
}

/**
 * edit players value
 * @param {number} player
 * @param {number} value
 * @param {number} round
 * @returns {{type, payload: {player: number, value: number, round: number}}}
 */
export function edit(round = 0, player = 0, value = 0) {
  return {
    type: DEFAULT_EDIT,
    payload: {
      player,
      value,
      round
    }
  };
}

/**
 * change the rules
 * @param options
 * @returns {{type, payload: {options: {}}}}
 */
export function rules(options) {
  return {
    type: DEFAULT_RULES,
    payload: {
      options
    }
  };
}
