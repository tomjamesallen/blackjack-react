/*
 * GameActions
 */

import AppDispatcher from '../dispatcher/AppDispatcher'
import GameConstants from '../constants/GameConstants'

var GameActions = {

  newGame() {
    AppDispatcher.dispatch({
      actionType: GameConstants.NEW_GAME
    })
  },

  newRound() {
    AppDispatcher.dispatch({
      actionType: GameConstants.NEW_ROUND
    })
  },

  playerHit() {
    AppDispatcher.dispatch({
      actionType: GameConstants.PLAYER_ACTION_HIT
    })
  },

  playerStand() {
    AppDispatcher.dispatch({
      actionType: GameConstants.PLAYER_ACTION_STAND
    })
  }
}

export default GameActions
