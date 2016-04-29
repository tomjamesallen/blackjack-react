import React, { PropTypes } from 'react'

let RoundIndicator = React.createClass({
  propTypes: {
    game: PropTypes.object.isRequired
  },

  render() {
    const { currentRound: round } = this.props.game

    // If we have a round, create the h2.
    let roundText
    if (round) {
      roundText = (
        <h2 className='round-indicator__text'>round {round}</h2>
      )
    }

    return (
      <div className='round-indicator'>
        {roundText}
      </div>
    )
  }
})

export default RoundIndicator
