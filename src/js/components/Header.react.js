import React, { PropTypes } from 'react'

import GameScoreBoard from './GameScoreBoard.react'
import RoundIndicator from './RoundIndicator.react'

let Header = React.createClass({
  propTypes: {
    state: PropTypes.object.isRequired
  },

  render() {
    const { game } = this.props.state

    return (
      <header className='header grid'>
        <div className='grid__col grid__col--left'>
          <div className='logo'>
            <h1 className='logo__h1'>
              <img
                className='logo__img'
                src='/img/blackjack-logo.svg'
                alt='BlackJack' />
            </h1>
          </div>
          <RoundIndicator game={game} />
        </div>

        <div className='grid__col grid__col--right'>
          <div className='pad-left pad-left--2-cards'>
            <GameScoreBoard game={game} />
          </div>
        </div>
      </header>
    )
  }
})

export default Header
