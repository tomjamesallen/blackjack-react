import React, { PropTypes } from 'react'

import RoundStages from '../constants/RoundStages'
import Card from './Card.react'

let Hand = React.createClass({
  propTypes: {
    handScore: PropTypes.object,
    hand: PropTypes.array.isRequired,
    actor: PropTypes.string.isRequired,
    stage: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.bool.isRequired
    ])
  },

  render() {
    if (!this.props.handScore) return null

    const {
      hand,
      handScore,
      actor,
      stage
    } = this.props

    let { lowAces } = handScore
    let cards = []

    hand.forEach((cardData, i) => {
      let lowAce = false
      let concealed = false

      // If it's the dealer's hand and we're at the initial deal or player's
      // turn, conceal all but the first card in the hand.
      if (actor === 'dealer' &&
         (stage === RoundStages.INITIAL_DEAL ||
          stage === RoundStages.PLAYER_TURN) &&
          i !== 0
      ) {
        concealed = true
      }

      if (lowAces && cardData.face === 'a') {
        lowAce = true
        lowAces--
      }

      const card = (
        <div className='hand__card' key={i}>
          <Card
            data={cardData}
            lowAce={lowAce}
            concealed={concealed} />
        </div>
      )
      cards.push(card)
    })

    return (
      <div className='hand'>
        {cards}
      </div>
    )
  }
})

export default Hand
