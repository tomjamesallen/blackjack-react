var React = require('react');

var classNames = require('classnames');

var Hand = require('./Hand.react');
var HandScore = require('./HandScore.react');

module.exports = React.createClass({

  /**
   * @return {object}
   */
  render() {

    var round = this.props.round;
    var actor = this.props.actor;
    var hand = round[actor + 'Hand'];
    var handScore = round[actor + 'HandScore'];

    return (
      <div className={classNames(
        'game-table-actor-row',
        'game-table-actor-row--' + actor,
        'grid'
      )}>
        <div
          className="game-table-actor-row__actor-name
                     grid__col
                     grid__col--left">
          <h2
            className={classNames(
              'game-table-actor-row__actor-name-text',
              'game-table-actor-row__actor-name-text--' + actor
          )}>{actor}</h2>
        </div>
        <div
          className="hand-and-hand-score
                     grid__col grid__col--right">
          
          <div className="hand-and-hand-score__hand">
            <Hand
              stage={round.stage}
              actor={actor}
              hand={hand}
              handScore={handScore}/>
          </div>
          <div className="hand-and-hand-score__score">
            <HandScore
              stage={round.stage}
              actor={actor}
              handScore={handScore}/>
          </div>
        </div>
      </div>
    );
  }

});