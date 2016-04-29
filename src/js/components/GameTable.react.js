var React = require('react');

var classNames = require('classnames');

var Hand = require('./Hand.react');
var HandScore = require('./HandScore.react');
var GameTableActorRow = require('./GameTableActorRow.react');
var GameTableMiddle = require('./GameTableMiddle.react');

module.exports = React.createClass({
  
  /**
   * @return {object}
   */
  render() {

    var state = this.props.state;
    var round = state.round;
    var game = state.game;

    var classes = classNames(
      'game-table',
      'game-table--stage-' + (round.stage || 'no-round')
    );

    return (
      <div className={classes}>
        <div
          className="game-table__row
                     game-table__row--dealer-row">
          <GameTableActorRow round={round} actor="dealer"/>
        </div>
        <div
          className="game-table__row
                     game-table__row--middle-row">

          <GameTableMiddle state={state}/>
        </div>
        <div
          className="game-table__row
                     game-table__row--player-row">
          <GameTableActorRow round={round} actor="player"/>
        </div>
      </div>
    );
  }

});