// React.
var React = require('react');

var classNames = require('classnames');

var Suits = require('../constants/Suits');
var Faces = require('../constants/Faces');

var Display = require('./helpers/Display.react');

module.exports = React.createClass({

  /**
   * @return {object}
   */
  render() {

    var card = this.props.data;
    var lowAce = this.props.lowAce;
    var concealed = this.props.concealed;
    var suit = Suits[card.suit];
    var face = Faces[card.face];

    // The classes for our card.
    // We weant the class `card` for all cards. For concealed cards we want the
    // concealed class, otherwise mark with suit, face and whether the card is a
    // low ace.
    var classes = classNames(
      'card',
      {
        'card--concealed': concealed,
        ['card--suit-' + card.suit]: !concealed,
        ['card--face-' + card.face]: !concealed,
        'card--low-ace': lowAce && !concealed
      }
    );

    var alt = 'Hidden Card';
    var svgPath;
    if (concealed) svgPath = '/img/cards/back.svg';
    else {
      alt = face + ' of ' + suit;
      svgPath = '/img/cards/' + card.suit + '-' + card.face + '.svg';
    }

    return (
      <div className={classes}>
        <img
          className="card__img"
          src={svgPath}
          alt={alt}/>
      </div>
    );
  }

});