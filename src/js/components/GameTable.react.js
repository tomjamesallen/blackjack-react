import React, { PropTypes } from 'react'
import classNames from 'classnames'

import GameTableActorRow from './GameTableActorRow.react'
import GameTableMiddle from './GameTableMiddle.react'

let GameTable = React.createClass({
  propTypes: {
    state: PropTypes.object.isRequired
  },

  render() {
    const { state } = this.props
    const { round } = state

    const classes = classNames(
      'game-table',
      'game-table--stage-' + (round.stage || 'no-round')
    )

    return (
      <div className={classes}>
        <div
          className={classNames(
            'game-table__row',
            'game-table__row--dealer-row'
          )}
        >
          <GameTableActorRow round={round} actor='dealer' />
        </div>
        <div
          className={classNames(
            'game-table__row',
            'game-table__row--middle-row'
          )}
        >
          <GameTableMiddle state={state} />
        </div>
        <div
          className={classNames(
            'game-table__row',
            'game-table__row--player-row'
          )}
        >
          <GameTableActorRow round={round} actor='player' />
        </div>
      </div>
    )
  }
})

export default GameTable
