/*
 * GameStore
 *
 * Contains the game logic.
 *
 * The GameStore emits events on data change, and listens for events emitted
 * from the AppDispatcher.
 *
 * It has a `getState()` method which returns all of the game state.
 */

// App imports.
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

// Constants.
var AppConstants = require('../constants/AppConstants');
var GameConstants = require('../constants/GameConstants');
var ScoreConstants = require('../constants/ScoreConstants');
var RoundStages = require('../constants/RoundStages');
var GamePlay = require('../constants/GamePlay');

// Helper.
var assign = require('object-assign');


// Create a deckManager instance.
var deckManager = require('../modules/DeckManager')();

// Get scoreCalculator.
var scoreCalculator = require('../modules/scoreCalculator');

// Get scoreComparator.
var scoreComparator = require('../modules/scoreComparator');

// Game play options.
// In future these could be loaded from a separate store rather than being
// constants.
const dealerHitOnSoft17 = GamePlay.DEALER_HIT_ON_SOFT_17;
const roundsPerGame = GamePlay.ROUNDS_PER_GAME;

// App globals.
const screenChangeDelay = AppConstants.SCREEN_CHANGE_DELAY;

// Round scoring.
const pointsForBlackjack = ScoreConstants.BLACKJACK_POINTS;
const pointsForWin = ScoreConstants.WIN_POINTS;
const pointsForDraw = ScoreConstants.DRAW_POINTS;

// Module constants.
const CHANGE_EVENT = 'change';

/**
 * Return default game state object.
 * @return {object} default game state.
 */
function returnDefaultGameState() {
  return {
    playerPoints: 0,
    dealerPoints: 0,

    currentRound: 0,
    roundsPerGame: roundsPerGame,
    gameOver: false,
    gameWinner: null,

    packsInPlay: 0,
    remainingCardsInDeck: 0
  }
}

/**
 * Return default round state object.
 * @return {object} default round state.
 */
function returnDefaultRoundState() {
  return {
    playerHand: [],
    dealerHand: [],

    playerHandScore: null,
    dealerHandScore: null,

    stage: false,
    transitioningStage: false,

    roundWinner: null,
  }
};

// Declare state variable in requisite scope.
var state;

/**
 * Set the state to the default game and round states.
 */
function setDefaultState() {
  state = {
    game: returnDefaultGameState(),
    round: returnDefaultRoundState()
  };
};

// Set default state immediately.
setDefaultState();

/**
 * Start a new game.
 */
function newGame() {

  // If We have a round stage and the game isn't over, then don't start a new
  // game.
  if (state.round.stage && !state.game.gameOver) return;

  // Set default game and round states.
  setDefaultState();

  // Create a new deck.
  newDeck();

  // Start a new round.
  newRound();
};

/**
 * Create a new deck.
 */
function newDeck() {
  // Calculate the number of packs of cards we'll need for the number of rounds
  // in the game. The maximum number of cards we should need for a round is
  // approx 20, although statistically lower, so (52 * roundsPerGame / 3)
  // rounded up should be enough.
  var requiredPacks = Math.ceil(roundsPerGame / 3);

  // Create the new deck with requisite number of packs. 
  deckManager.newDeck(requiredPacks);

  // Save the packsInPlay to state.
  state.game.packsInPlay = requiredPacks;

  // Save the remainingCardsInDeck to state.
  // We will also update this whenever a card is dealt.
  state.game.remainingCardsInDeck = deckManager.remainingCardsInDeck();
};

/**
 * Start a new round.
 */
function newRound() {
  // If we've already reached the roundsPerGame then end the game.
  // This is just to catch exceptions, the newRound action shouldn't be
  // accessible once the roundsPerGame count has been reached.
  if (state.game.currentRound >= state.game.roundsPerGame) return;

  // Get the previous round and increment.
  var round = state.game.currentRound + 1;

  // Create empty hands.
  var playerHand = [];
  var dealerHand = [];

  // Initial deal, two cards to both player and dealer.
  playerHand.push(deckManager.dealCard());
  dealerHand.push(deckManager.dealCard());
  playerHand.push(deckManager.dealCard());
  dealerHand.push(deckManager.dealCard());

  // Update remainingCardsInDeck.
  state.game.remainingCardsInDeck = deckManager.remainingCardsInDeck();

  // Get hand scores.
  var playerHandScore = scoreCalculator(playerHand);
  var dealerHandScore = scoreCalculator(dealerHand);

  // Combine default sate with the updates.
  state.round = assign(returnDefaultRoundState(), {
    playerHand: playerHand,
    dealerHand: dealerHand,

    playerHandScore: playerHandScore,
    dealerHandScore: dealerHandScore,

    stage: RoundStages.INITIAL_DEAL,
  });

  // Update the current round.
  state.game.currentRound = round;

  // Set transitioningStage to true so that we can block any duplicate actions
  // whilst we're waiting for a timer or animation.
  state.round.transitioningStage = true;

  // We've updated all the state that we need to for now, so emit a change. This
  // will trigger the app to re-render.
  GameStore.emitChange();

  // Delay the next action momentarily to allow the user to see the changes.
  setTimeout(function() {

    // Set transitioning back to false now. The change will be emitted by either
    // the `endRound` function or the `playerTurn` function.
    state.round.transitioningStage = false;

    // If either player or dealer has a blackjack in there initial hand then end
    // the round.
    if (playerHandScore.blackjack || dealerHandScore.blackjack) endRound();
    
    // Otherwise it's the player's turn.
    else playerTurn();

  }, screenChangeDelay);
};

/**
 * Start the player's turn.
 */
function playerTurn() {
  // All we do here is set the round stage to the player's turn and emit a
  // change event. The UI can then display the HIT and STAND buttons.
  state.round.stage = RoundStages.PLAYER_TURN;
  GameStore.emitChange();
};

/**
 * Player HIT action.
 * 
 * Triggered by a user interaction.
 */
function playerHit() {
  // We don't want to do anything here if the round stage is the player's turn
  // or we are currently transitioning.
  if (state.round.stage !== RoundStages.PLAYER_TURN
    || state.round.transitioningStage) {
    return;
  }

  // Get the playerHand.
  var playerHand = state.round.playerHand;

  // Push a new card from the deck to the playerHand.
  playerHand.push(deckManager.dealCard());
  state.game.remainingCardsInDeck = deckManager.remainingCardsInDeck();

  // Calculate the score of the playerHand.
  var playerHandScore = scoreCalculator(playerHand);

  // Update state with new playerHand and playerHandScore.
  state.round = assign(state.round, {
    playerHand: playerHand,
    playerHandScore: playerHandScore
  });

  // Set transitioningStage to true so that we can block any duplicate actions
  // whilst we're waiting for a timer or animation.
  state.round.transitioningStage = true;

  // We've updated all the state that we need to for now, so emit a change. This
  // will trigger the app to re-render.
  GameStore.emitChange();

  // Delay the next action momentarily to allow the user to see the changes.
  setTimeout(function() {

    // Set transitioning back to false now. The change will be emitted by either
    // the `endRound` function or the `playerTurn` function.
    state.round.transitioningStage = false;

    // If the playerHand is bust we end the round, otherwise the player gets
    // another turn.
    if (playerHandScore.bust) endRound();
    else playerTurn();

  }, screenChangeDelay);
};

/**
 * Player STAND action.
 * 
 * Triggered by a user interaction.
 */
function playerStand() {
  // We don't want to do anything here if the round stage is the player's turn
  // or we are currently transitioning.
  if (state.round.stage !== RoundStages.PLAYER_TURN
    || state.round.transitioningStage) {
    return;
  }

  // Call dealerTurn.
  dealerTurn();
};

/**
 * Start the dealer's turn.
 * @param  {bool} whether this is the first pass of the dealer turn, if it is
 *                we don't run any actions on the pass, but repeat the function
 *                after a delay.
 */
function dealerTurn(firstPass) {

  // We allow a first pass where no new card is added to the dealer's hand.
  // This is so that the dealer's hand can be seen, and a pause introduced
  // before the dealer must hit or stand.
  if (firstPass !== false) firstPass = true;

  // Get the current dealerHand and dealerHandScore.
  var dealerHand = state.round.dealerHand;
  var dealerHandScore = state.round.dealerHandScore;
  var score = dealerHandScore.score;

  // Determine whether the dealer has to hit.
  var dealerMustHit = false;
  if (score < 17 ||
      (score === 17 && dealerHandScore.soft && dealerHitOnSoft17)) {
    dealerMustHit = true;
  }

  // If dealer must hit then add another card to the dealerHand and
  // recalculate the dealerHandScore.
  if (dealerMustHit && !firstPass) {
    dealerHand.push(deckManager.dealCard());
    state.game.remainingCardsInDeck = deckManager.remainingCardsInDeck();
    
    dealerHandScore = scoreCalculator(dealerHand);
  }

  // Update round state.
  state.round = assign(state.round, {
    dealerHand: dealerHand,
    dealerHandScore: dealerHandScore,
    stage: RoundStages.DEALER_TURN,
  });


  // Set transitioningStage to true so that we can block any duplicate actions
  // whilst we're waiting for a timer or animation.
  state.round.transitioningStage = true;

  // We've updated all the state that we need to for now, so emit a change. This
  // will trigger the app to re-render.
  GameStore.emitChange();

  // If dealer is bust, or dealer doesn't have to hit, then end the round,
  // otherwise repeat the dealer turn.
  if ((dealerHandScore.bust || !dealerMustHit) && !firstPass) {

    // Set transitioning back to false now. The change will be emitted by either
    // the `endRound` function or the `playerTurn` function.
    state.round.transitioningStage = false;

    endRound();
  }
  else {
    // Delay the next action momentarily to allow the user to see the changes.
    setTimeout(function() {

      // Set transitioning back to false now. The change will be emitted by
      // either the `endRound` function or the `playerTurn` function.
      state.round.transitioningStage = false;

      // Call dealerTurn again.
      dealerTurn(false);

    }, screenChangeDelay);
  }
};

/**
 * End the current round.
 */
function endRound() {
  // Compare player and dealer hands.
  var winningHand = scoreComparator(state.round.playerHandScore,
                                      state.round.dealerHandScore);

  // Get current player/dealer round points.
  var playerPoints = state.game.playerPoints,
      dealerPoints = state.game.dealerPoints,
      roundWinner;

  // Winning hand returns 'draw' / 1 / 2. 1 and 2 correspond to the order that
  // the hands are passed to the function. So hand 1 is the player's hand, and
  // hand 2 is the dealer's hand.
  if (winningHand.hand === 'draw') {
    roundWinner = 'draw';
    playerPoints += pointsForDraw;
    dealerPoints += pointsForDraw;
  }
  if (winningHand.hand === 1) {
    roundWinner = 'player';
    if (winningHand.blackjack) playerPoints += pointsForBlackjack;
    else playerPoints += pointsForWin;
  }
  if (winningHand.hand === 2) {
    roundWinner = 'dealer';
    if (winningHand.blackjack) dealerPoints += pointsForBlackjack;
    else dealerPoints += pointsForWin;
  }

  // Update the round state.
  state.round = assign(state.round, {
    roundWinner: roundWinner,
    stage: RoundStages.ROUND_ENDED
  });

  // Update the game state.
  state.game = assign(state.game, {
    playerPoints: playerPoints,
    dealerPoints: dealerPoints
  });

  // Determine whether the game has ended and if so who won.
  if (state.game.currentRound >= state.game.roundsPerGame) {
    state.game.gameOver = true;
    if (state.game.dealerPoints === state.game.playerPoints) {
      state.game.gameWinner = 'Draw';
    }
    else if (state.game.dealerPoints > state.game.playerPoints) {
      state.game.gameWinner = 'Dealer';
    }
    else if (state.game.dealerPoints < state.game.playerPoints) {
      state.game.gameWinner = 'Player';
    }
  }

  // Emit a change event.
  GameStore.emitChange();
};

var GameStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the full game state.
   * @return {object}
   */
  getState() {
    return state;
  },

  /**
   * Used in the functions above to trigger an update to the UI.
   */
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case GameConstants.NEW_GAME:
      newGame();
      break;

    case GameConstants.NEW_ROUND:
      newRound();
      break;

    case GameConstants.PLAYER_ACTION_HIT:
      playerHit();
      break;

    case GameConstants.PLAYER_ACTION_STAND:
      playerStand();
      break;

    default:
  }
});

module.exports = GameStore;
