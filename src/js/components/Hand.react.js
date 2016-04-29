import React, { PropTypes } from 'react'
import classNames from 'classnames'

import RoundStages from '../constants/RoundStages'

import Card from './Card.react'

let Hand = React.createClass({
  
  /**
   * @return {object}
   */
  render() {
    if (!this.props.handScore) return null;

    var that = this;
    var lowAces = this.props.handScore.lowAces;
    var cards = [];

    this.props.hand.forEach(function (cardData, i) {
      var lowAce = false;
      var concealed = false;

      // If it's the dealer's hand and we're at the initial deal or player's
      // turn, conceal all but the first card in the hand.
      if (that.props.actor === 'dealer' &&
         (that.props.stage === RoundStages.INITIAL_DEAL ||
          that.props.stage === RoundStages.PLAYER_TURN) &&
          i !== 0) {
        concealed = true;
      }
      
      if (lowAces && cardData.face === 'a') {
        lowAce = true;
        lowAces --;
      }

      var card = (
        <div className="hand__card" key={i}>
          <Card
            data={cardData}
            lowAce={lowAce}
            concealed={concealed}/>
        </div>
      );
      cards.push(card);
    });

    return (
      <div className="hand">
        {cards}
      </div>
    );
  }
})

module.exports = Hand
