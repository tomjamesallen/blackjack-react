var React = require('react');

var classNames = require('classnames');
var titleCase = require('../helpers/titleCase');

import GameActions from '../actions/GameActions'
var RoundStages = require('../constants/RoundStages');

var Display = require('./helpers/Display.react');

module.exports = React.createClass({
  
  /**
   * @return {object}
   */
  render() {

    var game = this.props.state.game;
    var round = this.props.state.round;
    var stage = this.props.state.round.stage;
    var transitioning = this.props.state.round.transitioningStage;

    // Create empty elements.
    var roundWinnerMessage;
    var gameWinnerMessage;
    var inputMessage;

    // Handle round winner.
    var roundWinner;
    if (stage === RoundStages.ROUND_ENDED && !transitioning) {
      
      if (round.roundWinner !== 'draw') {
        roundWinner = titleCase(round.roundWinner) + ' wins round!';
      }
      else {
        roundWinner = titleCase(round.roundWinner) + ' round!';
      }

      roundWinnerMessage = (
        <div className="message-area__round-winner">
          <div className="message-area__round-winner-inner">
            <h3>{roundWinner}</h3>
          </div>
        </div>
      );
    }

    // Handle game winner.
    var gameWinner;
    if (game.gameOver) {

      if (game.gameWinner === 'Draw') {
        gameWinner = 'Draw';
      }
      else {
        gameWinner = game.gameWinner + ' wins game!';
      }

      gameWinnerMessage = (
        <div className="message-area__game-winner">
          <div className="message-area__game-winner-inner">
            <h2>Game Over - {gameWinner}</h2>
          </div>
        </div>
      );
    }

    // Handle input.
    if (stage === RoundStages.PLAYER_TURN && !transitioning) {
      inputMessage = (
        <div className="message-area__input">
          <div className="message-area__input-inner">
            <button
              className="btn"
              onClick={this._onClickHit}
              >HIT</button>
            <button
              className="btn btn--secondary"
              onClick={this._onClickStand}
              >STAND</button>
          </div>
        </div>
      );
    }
    else if (stage === RoundStages.ROUND_ENDED && !transitioning) {
      if (!game.gameOver) {
        inputMessage = (
          <div className="message-area__input">
            <div className="message-area__input-inner">
              <button
                className="btn"
                onClick={this._onClickNewRound}
                >New Round</button>
            </div>
          </div>
        );
      }
      else {
        inputMessage = (
          <div className="message-area__input">
            <div className="message-area__input-inner">
              <button
                className="btn" 
                onClick={this._onClickNewGame}
                >New Game</button>
            </div>
          </div>
        );
      }
    }
    else if (!stage) {
      inputMessage = (
        <div className="message-area__input">
          <div className="message-area__input-inner">
            <button
              className="btn" 
              onClick={this._onClickNewGame}
              >New Game</button>
          </div>
        </div>
      );
    }

    return (
      <div className="message-area">
        {roundWinnerMessage}
        {gameWinnerMessage}
        {inputMessage}
      </div>
    );
  },

  /**
   * Handle interactions.
   */
  _onClickNewGame() {
    GameActions.newGame();
  },

  _onClickNewRound() {
    GameActions.newRound();
  },

  _onClickHit() {
    GameActions.playerHit();
  },

  _onClickStand() {
    GameActions.playerStand();
  },

});