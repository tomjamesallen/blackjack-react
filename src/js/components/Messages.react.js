import React, { PropTypes } from 'react'
import titleCase from '../helpers/titleCase'

import GameActions from '../actions/GameActions'
import RoundStages from '../constants/RoundStages'

let Messages = React.createClass({
  propTypes: {
    state: PropTypes.object.isRequired
  },

  render() {
    const { game, round } = this.props.state
    const { stage, transitioningStage: transitioning } = round

    // Create empty elements.
    let roundWinnerMessage
    let gameWinnerMessage
    let inputMessage

    // Handle round winner.
    let roundWinner
    if (stage === RoundStages.ROUND_ENDED && !transitioning) {
      if (round.roundWinner !== 'draw') {
        roundWinner = titleCase(round.roundWinner) + ' wins round!'
      }
      else {
        roundWinner = titleCase(round.roundWinner) + ' round!'
      }

      roundWinnerMessage = (
        <div className='message-area__round-winner'>
          <div className='message-area__round-winner-inner'>
            <h3>{roundWinner}</h3>
          </div>
        </div>
      )
    }

    // Handle game winner.
    let gameWinner
    if (game.gameOver) {
      if (game.gameWinner === 'Draw') {
        gameWinner = 'Draw'
      }
      else {
        gameWinner = game.gameWinner + ' wins game!'
      }

      gameWinnerMessage = (
        <div className='message-area__game-winner'>
          <div className='message-area__game-winner-inner'>
            <h2>Game Over - {gameWinner}</h2>
          </div>
        </div>
      )
    }

    // Handle input.
    if (stage === RoundStages.PLAYER_TURN && !transitioning) {
      inputMessage = (
        <div className='message-area__input'>
          <div className='message-area__input-inner'>
            <button
              className='btn'
              onClick={this._onClickHit}
            >HIT</button>
            <button
              className='btn btn--secondary'
              onClick={this._onClickStand}
            >STAND</button>
          </div>
        </div>
      )
    }
    else if (stage === RoundStages.ROUND_ENDED && !transitioning) {
      if (!game.gameOver) {
        inputMessage = (
          <div className='message-area__input'>
            <div className='message-area__input-inner'>
              <button
                className='btn'
                onClick={this._onClickNewRound}
              >New Round</button>
            </div>
          </div>
        )
      }
      else {
        inputMessage = (
          <div className='message-area__input'>
            <div className='message-area__input-inner'>
              <button
                className='btn'
                onClick={this._onClickNewGame}
              >New Game</button>
            </div>
          </div>
        )
      }
    }
    else if (!stage) {
      inputMessage = (
        <div className='message-area__input'>
          <div className='message-area__input-inner'>
            <button
              className='btn'
              onClick={this._onClickNewGame}
            >New Game</button>
          </div>
        </div>
      )
    }

    return (
      <div className='message-area'>
        {roundWinnerMessage}
        {gameWinnerMessage}
        {inputMessage}
      </div>
    )
  },

  /**
   * Handle interactions.
   */
  _onClickNewGame() {
    GameActions.newGame()
  },

  _onClickNewRound() {
    GameActions.newRound()
  },

  _onClickHit() {
    GameActions.playerHit()
  },

  _onClickStand() {
    GameActions.playerStand()
  }
})

export default Messages
