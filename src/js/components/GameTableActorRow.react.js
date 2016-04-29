import React, { PropTypes } from 'react'
import classNames from 'classnames'

import Hand from './Hand.react'
import HandScore from './HandScore.react'

let GameTableActorRow = React.createClass({
  propTypes: {
    round: PropTypes.object.isRequired,
    actor: PropTypes.string.isRequired
  },

  render() {
    const { round, actor } = this.props
    const hand = round[`${actor}Hand`]
    const handScore = round[`${actor}HandScore`]

    return (
      <div
        className={classNames(
          'game-table-actor-row',
          `game-table-actor-row--${actor}`,
          'grid'
        )}
      >
        <div
          className={classNames(
            'game-table-actor-row__actor-name',
            'grid__col',
            'grid__col--left'
          )}
        >
          <h2
            className={classNames(
              'game-table-actor-row__actor-name-text',
              `game-table-actor-row__actor-name-text--${actor}`
            )}
          >{actor}</h2>
        </div>
        <div
          className={classNames(
            'hand-and-hand-score',
            'grid__col grid__col--right'
          )}
        >
          <div className='hand-and-hand-score__hand'>
            <Hand
              stage={round.stage}
              actor={actor}
              hand={hand}
              handScore={handScore} />
          </div>
          <div className='hand-and-hand-score__score'>
            <HandScore
              stage={round.stage}
              actor={actor}
              handScore={handScore} />
          </div>
        </div>
      </div>
    )
  }
})

export default GameTableActorRow
