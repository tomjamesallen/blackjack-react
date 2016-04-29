/**
 * Calculates the outcome of comparing the score of two hands.
 *
 * Returns an object containing information on whether either hand wins with a
 * blackjack, and which hand has the highest score. Blackjack is not marked if
 * there is a draw.
 */
function scoreComparator(hand1ScoreData, hand2ScoreData) {
  // Winner placeholder.
  let winner = {
    hand: null,
    blackjack: false
  }

  // If both hands have blackjacks then it's a drawer.
  if (hand1ScoreData.blackjack && hand2ScoreData.blackjack) {
    winner.hand = 'draw'
  }

  // If only one hand has a blackjack then that's the winning hand.
  else if (hand1ScoreData.blackjack) {
    winner.hand = 1
    winner.blackjack = true
  }
  else if (hand2ScoreData.blackjack) {
    winner.hand = 2
    winner.blackjack = true
  }

  // If there are no blackjacks in either hand, then we look at the raw scores.
  // If they are equal then it's a drawer, otherwise the higher score wins.
  else if (hand1ScoreData.score === hand2ScoreData.score) winner.hand = 'draw'
  else if (hand1ScoreData.score > hand2ScoreData.score) winner.hand = 1
  else if (hand1ScoreData.score < hand2ScoreData.score) winner.hand = 2

  // Return the winner. Either 1 or 2, referring to the first and second hand
  // passed to the function.
  return winner
}

export default scoreComparator
