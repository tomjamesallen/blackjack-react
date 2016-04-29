var React = require('react');

var classNames = require('classnames');

var RoundStages = require('../constants/RoundStages');

module.exports = React.createClass({
  
  /**
   * @return {object}
   */
  render() {

    var actor = this.props.actor;
    var handScore = this.props.handScore;
    var score;
    var scoreNote;
    var scoreText;

    if (handScore) {
      if (!(this.props.actor === 'dealer' &&
           (this.props.stage === RoundStages.INITIAL_DEAL ||
            this.props.stage === RoundStages.PLAYER_TURN))) {
        
        if (handScore.blackjack) {
          score = 'Blackjack!';
        }
        else if (!handScore.bust) {
          score = handScore.score;
        }
        else if (handScore.bustScore) {
          score = handScore.bustScore;
        }

        if (handScore.bust) {
          scoreNote = <span className="hand-score__note">bust!</span>;
        }

        if (handScore.soft && !handScore.blackjack) {
          scoreNote = <span className="hand-score__note">soft</span>;
        }
      }
    }

    if (score) {
      scoreText = (
        <h2 className={classNames(
          'hand-score__score',
          'hand-score__score--' + actor,
          {'hand-score__score--blackjack': handScore.blackjack}
        )}>{score}{scoreNote}</h2>
      );
    }

    return (
      <div className="hand-score">
        {scoreText}
      </div>
    );
  }

});