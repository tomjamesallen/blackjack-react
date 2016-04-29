import React, { PropTypes } from 'react'
import classNames from 'classnames'

import Suits from '../constants/Suits'
import Faces from '../constants/Faces'

let Card = React.createClass({
  propTypes: {
    data: PropTypes.object.isRequired,
    lowAce: PropTypes.bool.isRequired,
    concealed: PropTypes.bool.isRequired
  },

  render() {
    const { data: card, lowAce, concealed } = this.props
    const suit = Suits[card.suit]
    const face = Faces[card.face]

    // The classes for our card.
    // We weant the class `card` for all cards. For concealed cards we want the
    // concealed class, otherwise mark with suit, face and whether the card is a
    // low ace.
    const classes = classNames(
      'card',
      {
        'card--concealed': concealed,
        ['card--suit-' + card.suit]: !concealed,
        ['card--face-' + card.face]: !concealed,
        'card--low-ace': lowAce && !concealed
      }
    )

    var alt = 'Hidden Card'
    var svgPath
    if (concealed) {
      svgPath = '/img/cards/back.svg'
    }
    else {
      alt = `${face} of ${suit}`
      svgPath = `/img/cards/${card.suit}-${card.face}.svg`
    }

    return (
      <div className={classes}>
        <img
          className='card__img'
          src={svgPath}
          alt={alt} />
      </div>
    )
  }
})

export default Card
