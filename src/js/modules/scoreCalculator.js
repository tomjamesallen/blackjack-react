/**
 * Calculates the score of a hand.
 *
 * This is a helper function which takes an array of cards (a hand), and returns
 * the score data for the hand.
 *
 * The score data includes the score itself, as well as whether the hand is a
 * blackjack, whether it is bust, how many aces there are in the hand, how many
 * aces are currently acting low, and whether the hand is "soft" (ie, contains a
 * high ace).
 */
function scoreCalculator(hand) {
  // Hand of cards, or empty array.
  hand = hand || []

  // Initial values.
  let score = 0
  let acesInHand = 0
  let lowAces = 0
  let soft = false
  let blackjack = false
  let bust = false
  let bustScore = null

  // We must loop through all the cards in the hand, adding up the value of the
  // cards and keeping track of the number of aces.
  hand.forEach((card) => {
    if (card.face === 'a') acesInHand++
    score += card.value
  })

  // If we have a score of 21 with only two cards in the hand then mark as
  // blackjack.
  if (hand.length === 2 && score === 21) {
    blackjack = true
  }

  // Deal with the special case of aces being worth 11 or 1.
  //
  // This works on the premise that the player will want an ace to be high
  // unless that would take them over 21, in which case the ace should be low.
  //
  // We repeat this function until the hand's score is under 21, or we've run
  // out of aces.
  (function handleAces() {
    // If the score is less than or equal to 21 we're all good, so no need to
    // use any low aces.
    if (score <= 21) return

    // If we don't have any aces or our aces are all already low, then we can't
    // do anything to reduce the score so return here.
    if (lowAces >= acesInHand) return

    // If we've got this far, then we're over 21 and we've got an ace that's
    // currently scoring high, that we could score low in order to avoid going
    // bust. So we'll do that.
    score -= 10
    lowAces++

    // We then repeat this step until we're below 21, or we've run out of high
    // aces.
    handleAces()
  })()

  // If we have any acesInHand that are not low, then our score is still 'soft'.
  if (lowAces < acesInHand) soft = true

  // If our score is still over 21 we're out of luck. Bust.
  if (score > 21) {
    bust = true
    bustScore = score
    score = 0
  }

  // Return the score data.
  return {
    // The score of the hand [numeric].
    score,

    // Whether the hand is a blackjack [bool].
    blackjack,

    // Whether the hand is a bust [bool].
    bust,

    // If the hand is bust then return the losing score.
    bustScore,

    // The number of aces in the hand [numeric].
    aces: acesInHand,

    // The number of aces acting low in the hand [numeric].
    lowAces,

    // Whether the score is 'soft' [bool].
    soft
  }
}

export default scoreCalculator
