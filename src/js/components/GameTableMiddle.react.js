import React, { PropTypes } from 'react'
import classNames from 'classnames'

import Pack from './Pack.react'
import Messages from './Messages.react'

let GameTableMiddle = React.createClass({
  propTypes: {
    state: PropTypes.object.isRequired
  },

  render() {
    const { game } = this.props.state

    return (
      <div className='game-table-middle grid'>
        <div
          className={classNames(
            'game-table-middle__pack',
            'pad-left',
            'pad-left--1-card',
            'grid__col',
            'grid__col--left'
          )}
        >
          <Pack
            remainingCardsInDeck={game.remainingCardsInDeck}
            packsInPlay={game.packsInPlay} />
        </div>

        <div
          className={classNames(
            'game-table-middle__messages',
            'pad-left',
            'pad-left--1-card',
            'grid__col',
            'grid__col--right'
          )}
        >
          <Messages state={this.props.state} />
        </div>
      </div>
    )
  }
})

export default GameTableMiddle
