var React = require('react');

var GameScoreBoard = require('./GameScoreBoard.react');
var RoundIndicator = require('./RoundIndicator.react');

module.exports = React.createClass({

  /**
   * @return {object}
   */
  render() {

    return (
      <header className="header grid">
        
        <div className="grid__col grid__col--left">
          <div className="logo">
            <h1 className="logo__h1">
              <img
                className="logo__img"
                src="/img/blackjack-logo.svg"
                alt="BlackJack"/>
            </h1>
          </div>
          <RoundIndicator game={this.props.state.game}/>          
        </div>

        <div className="grid__col grid__col--right">
          <div className="pad-left pad-left--2-cards">
            <GameScoreBoard game={this.props.state.game}/>
          </div>
        </div>
        
      </header>
    );
  }

});