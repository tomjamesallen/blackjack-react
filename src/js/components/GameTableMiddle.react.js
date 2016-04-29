var React = require('react');

var Pack = require('./Pack.react');
var Messages = require('./Messages.react');

module.exports = React.createClass({

  /**
   * @return {object}
   */
  render() {

    var game = this.props.state.game;

    return (
      <div className="game-table-middle grid">

        <div
          className="game-table-middle__pack
                     pad-left
                     pad-left--1-card
                     grid__col
                     grid__col--left">

          <Pack
            remainingCardsInDeck={game.remainingCardsInDeck}
            packsInPlay={game.packsInPlay}/>
        </div>

        <div
          className="game-table-middle__messages
                     pad-left
                     pad-left--1-card
                     grid__col
                     grid__col--right">

          <Messages state={this.props.state}/>
        </div>

      </div>
    );
  }

});