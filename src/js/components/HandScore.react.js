import React, { PropTypes } from 'react'
import classNames from 'classnames'

import RoundStages from '../constants/RoundStages'

let HandScore = React.createClass({
  propTypes: {
    handScore: PropTypes.object,
    actor: PropTypes.string.isRequired,
    stage: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.bool.isRequired
    ])
  },

  render() {
    const {
      actor,
      handScore,
      stage
    } = this.props

    let score
    let scoreNote
    let scoreText

    if (handScore) {
      if (!(actor === 'dealer' &&
           (stage === RoundStages.INITIAL_DEAL ||
            stage === RoundStages.PLAYER_TURN))
      ) {
        if (handScore.blackjack) {
          score = 'Blackjack!'
        }
        else if (!handScore.bust) {
          score = handScore.score
        }
        else if (handScore.bustScore) {
          score = handScore.bustScore
        }

        if (handScore.bust) {
          scoreNote = <span className='hand-score__note'>bust!</span>
        }

        if (handScore.soft && !handScore.blackjack) {
          scoreNote = <span className='hand-score__note'>soft</span>
        }
      }
    }

    if (score) {
      scoreText = (
        <h2
          className={classNames(
            'hand-score__score',
            'hand-score__score--' + actor,
            {'hand-score__score--blackjack': handScore.blackjack}
          )}
        >{score}{scoreNote}</h2>
      )
    }

    return (
      <div className='hand-score'>
        {scoreText}
      </div>
    )
  }
})

export default HandScore
