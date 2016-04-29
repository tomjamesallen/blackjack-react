var React = require('react');

module.exports = React.createClass({

  /**
   * @return {object}
   */
  render() {

    var round = this.props.game.currentRound;
    
    return (
      <div className="game-score-board">
        <h2 className="game-score-board__heading">Game Points</h2>
        <table className="game-score-board__table">
          <thead>
            <tr>
              <th
                className="game-score-board__table-cell
                           game-score-board__table-heading
                           game-score-board__table-heading--player"
                >Player</th>
              <th
                className="game-score-board__table-cell
                           game-score-board__table-heading
                           game-score-board__table-heading--dealer"
                >Dealer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="game-score-board__table-cell
                           game-score-board__table-score
                           game-score-board__table-score--player"
                >{this.props.game.playerPoints}</td>
              <td
                className="game-score-board__table-cell
                           game-score-board__table-score
                           game-score-board__table-score--dealer"
                >{this.props.game.dealerPoints}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

});