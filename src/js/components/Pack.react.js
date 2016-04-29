import React, { PropTypes } from 'react'
import classNames from 'classnames'

let Pack = React.createClass({
  propTypes: {
    remainingCardsInDeck: PropTypes.number.isRequired
  },

  render() {
    const packEmpty = this.props.remainingCardsInDeck === 0
    const classes = classNames(
      'pack',
      {'pack--empty': packEmpty}
    )

    let packImg
    if (!packEmpty) {
      packImg = (
        <div className='card card--concealed'>
          <img
            className='card__img'
            src='/img/cards/back.svg' />
        </div>
      )
    }

    return (
      <div className={classes}>
        {packImg}
        <div className='pack__info'>
          <p className='pack__card-count'>{this.props.remainingCardsInDeck} cards</p>
        </div>
      </div>
    )
  }
})

export default Pack
