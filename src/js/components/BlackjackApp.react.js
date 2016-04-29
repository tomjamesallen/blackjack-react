var React = require('react');

var GameStore = require('../stores/GameStore');
var GameActions = require('../actions/GameActions');
var RoundStages = require('../constants/RoundStages');

var Display = require('./helpers/Display.react');
var Header = require('./Header.react');
var GameTable = require('./GameTable.react');
var Footer = require('./Footer.react');

/**
 * Get application state.
 * @return {object} full application state.
 */
function getAllState() {
  return GameStore.getState()
}

// Create APP component.
var APP = React.createClass({

  getInitialState() {
    return getAllState();
  },

  componentDidMount() {
    GameStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    GameStore.removeChangeListener(this._onChange);
  },

  /**
   * Render the APP component.
   * @return {object}
   */
  render() {
    return (
      <div className="blackjack-app">
        <Header state={this.state}/>
        <GameTable state={this.state}/>
        <Footer/>       
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the GameStore
   */
  _onChange() {
    this.setState(getAllState());
  }
});

module.exports = APP;