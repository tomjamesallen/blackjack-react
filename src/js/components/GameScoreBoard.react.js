import React, { PropTypes } from 'react'
import classNames from 'classnames'

let GameScoreBoard = React.createClass({
  propTypes: {
    game: PropTypes.object.isRequired
  },

  render() {
    const { game } = this.props

    return (
      <div className='game-score-board'>
        <h2 className='game-score-board__heading'>Game Points</h2>
        <table className='game-score-board__table'>
          <thead>
            <tr>
              <th
                className={classNames(
                  'game-score-board__table-cell',
                  'game-score-board__table-heading',
                  'game-score-board__table-heading--player'
                )}
              >Player</th>
              <th
                className={classNames(
                  'game-score-board__table-cell',
                  'game-score-board__table-heading',
                  'game-score-board__table-heading--dealer'
                )}
              >Dealer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className={classNames(
                  'game-score-board__table-cell',
                  'game-score-board__table-score',
                  'game-score-board__table-score--player'
                )}
              >{game.playerPoints}</td>
              <td
                className={classNames(
                  'game-score-board__table-cell',
                  'game-score-board__table-score',
                  'game-score-board__table-score--dealer'
                )}
              >{game.dealerPoints}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
})

export default GameScoreBoard
