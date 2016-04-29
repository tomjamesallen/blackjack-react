var React = require('react');

module.exports = React.createClass({

  /**
   * @return {object}
   */
  render() {
    
    var round = this.props.game.currentRound;
    var roundText;

    // If we have a round, create the h2.
    if (round) {
      roundText = (
        <h2 className="round-indicator__text">round {round}</h2>
      );
    }
    
    return (
      <div className="round-indicator">
        {roundText}
      </div>
    );
  }

});