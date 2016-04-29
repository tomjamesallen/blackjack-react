/**
 * DeckManager.js
 *
 * This module returns a constructor which can return instances of the deck
 * manager. An instance of the deck manager has public methods for creating a
 * new deck `newDeck()`, returning a card from the deck `dealCard()`, and return
 * the number of remaining cards in the deck `remainingCardsInDeck()`.
 */

// Required libs / helpers.
// var _ = require('underscore')
import shuffleArray from '../helpers/shuffleArray'
import assign from 'object-assign'
import range from 'lodash.range'

/**
 * Returns an instance of a deck manager.
 */
function DeckManager(options) {
  // Set module defaults.
  const defaults = {
    packsPerDeck: 1,
    autoNewDeck: false
  }

  // Create placeholder for options.
  let op

  // Card constants.
  const facesAndValues = {
    'a': 11, // We deal with the special case when adding up the scores.
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'j': 10,
    'q': 10,
    'k': 10
  }
  const suits = ['h', 's', 'd', 'c']

  // Store deck and deck order in closure so that developer's can't cheat.
  let deck = {}
  let deckOrder = []

  // Our top level API object, we will hang all public and pseudo private
  // methods off this object, and return the object on instantiation of the
  // modlule.
  let api = {

    // Initialise the module.
    _init() {
      // Combine defaults and options.
      api.options = op = assign({}, defaults, options)

      // Return the API object.
      return this
    },

    /**
     * Public method to create a new deck.
     */
    newDeck(numPacks) {
      // Set default number of packs if none given.
      numPacks = numPacks || op.packsPerDeck

      // Reset the deck.
      api._resetDeck()

      // Create a new deck.
      api._createDeck(numPacks)

      // Create a deck order.
      api._createDeckOrder()
    },

    /**
     * Public function to deal a card from the deck.
     */
    dealCard() {
      // If autoNewDeck is set, we should check that we have a card left to deal
      // and if not we create a new deck automatically.
      if (op.autoNewDeck && (!deck.cards || deck.dealt + 1 > deckOrder.length)) {
        api.newDeck()
      }

      // Return false if we don't have any cards in the deck.
      // This could happen if `dealCard` is called before `newDeck`.
      if (!deck.cards) return false

      // Return false if all the cards have been dealt.
      if (deck.dealt + 1 > deckOrder.length) return false

      // Get the ID of the next card to be dealt.
      const nextCardId = deckOrder[deck.dealt]

      // Get the card.
      let card = deck.cards[nextCardId]

      // Set the card's dealt position (this is it's position in the deckOrder)
      card.dealt = deck.dealt

      // Increment the number of cards that have been dealt.
      deck.dealt ++

      // Return the dealt card.
      return card
    },

    /**
     * Return the number remaining cards in the deck.
     */
    remainingCardsInDeck() {
      if (!deck.cards) return 0
      else return deckOrder.length - deck.dealt
    },

    // Reset the deck.
    _resetDeck() {
      deck = {}
      deckOrder = []
    },

    // Create a deck of x packs (these be in suit order, so we use the
    // deck order to determine the order in which the cards are dealt).
    _createDeck(numPacks) {
      numPacks = numPacks || op.packsPerDeck

      // Create initial deck data.
      let tempDeck = {
        // The number of packs of cards in play.
        packs: numPacks,

        // The number of cards dealt from the deck so far.
        dealt: 0,

        // The cards in the deck.
        cards: []
      }

      // Create packs.
      for (let i = 0; i < numPacks; i++) {
        tempDeck.cards = tempDeck.cards.concat(api._createPack())
      }

      // Save each card's id to the object.
      tempDeck.cards.forEach(function(card, i) {
        if (typeof card === 'object') card.id = i
      })

      // Save tempDeck data to deck.
      deck = tempDeck
    },

    // Create the shuffled order in which the cards will be dealt.
    _createDeckOrder() {
      // Count the number of cards in the deck and create a random list of the
      // card IDs.
      const deckLength = deck.cards.length

      const availableIds = range(0, deckLength)

      // Shuffle the availableIds to create a deck order.
      deckOrder = shuffleArray(availableIds)
    },

    // Create and return a single pack.
    //
    // This should only called by `_createDeck`.
    _createPack() {
      let pack = []

      // Create a card for each suit, for each face.
      suits.forEach(function(suit) {
        let facesAndValuesKeys = Object.keys(facesAndValues)
        facesAndValuesKeys.forEach(function(face) {
          pack.push(api._createCard(suit, face))
        })
      })

      // Return the pack of cards.
      return pack
    },

    // Called only by `_createPack`.
    _createCard(suit, face) {
      const value = facesAndValues[face]

      // Return the card object.
      return {
        suit,
        face,
        value,
        dealt: false
      }
    }

    // For development only.
    // _getDeck() {
    //   return deck
    // },
    // _getDeckOrder() {
    //   return deckOrder
    // },
    // _setDeckOrder(deckOrderInput) {
    //   deckOrder = deckOrderInput
    // }
  }

  return api._init()
}

export default DeckManager

// /////////////////////////////////////////////////////////////////////////////
// A deck looks like this.
//
// deck = {
//   packs: 1, // the number of packs in play.
//   dealt: 4, // number of cards that have been dealt from the deck.
//   cards: [] // an array of cards, each card is as below.
// }


// /////////////////////////////////////////////////////////////////////////////
// A card looks like this.
//
// card = {
//   suit: 'h',     // h / c / d / s
//   face: 'a',     // a / (2 -> 10) / j / q / k
//   value: '11',   // the score of the card, for aces mark as 11, we will
//                  // handle the special case later
//   dealt: false,  // starts as false, when dealt, the card will be given the
//                  // position that it was dealt in.
//   id: 0          // Each card that's created is given an ID within the deck.
// }
