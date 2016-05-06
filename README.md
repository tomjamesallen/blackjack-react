# Blackjack react app

A version of the popular card game 'blackjack' written in JavaScript and using react + flux to structure the app and render the UI.

## Approach

I started by breaking the rules down into a set of flow diagrams, and from there looked at the discrete bits of logic I would need to manage the game. 

I broke the logic down into the following areas:

* __Deck management__ - Creating a deck of one or more packs of cards, containing the data for each card, and providing a way of drawing a card at random from the deck.
* __Score calculation__ - Calculating the score for a given hand. The complicated element here was handling ACEs as they can score high or low, depending on the context - I'll come back to this.
* __Game logic__ - Keeping track of the state of the current round and game and showing the appropriate elements on the screen, based on the context.

I decided the first two elements could be isolated modules that just expose the requisite methods. However the game logic and UI would be better managed with a framework, so I decided to go with React.js and realised (a day into the project) that the Flux pattern was going to be a good fit, so I moved the game logic that I'd written in my APP component into a Store.

I first built out the `DeckManager` and `scoreCalculator` modules (found in `/src/js/modules/`). I had a tight spec for each of these, so they were pretty quick to create. As mentioned, the biggest challenge was handling the special case of ACEs when calculating the score of a hand. The way that I decided to handle this was by treating ACEs as high unless this would take the hand's score over 21, in which case they would switch to low. This can be repeated for each ace in the hand. I used the concept of a hand being 'soft' if it contains a high ace. The `scoreCalculator` returns both the raw score, as well as some additional data on the hand that can be used in the game logic. It returns the following:

* Raw score (0 if bust)
* Whether the hand is a blackjack
* Whether the hand is bust
* If the hand is bust, then the score that took the hand over 21
* Number of aces in the hand
* Number of low aces in the hand
* Whether the hand is soft (contains one or more high aces)

Using the above data we can show the player their current score, and whether their score is soft.

All of the game logic can be found in the GameStore (`/src/js/stores/GameStore.js`). This emits events when there is a state change. The GameStore also has a method to return the full state data for the game. The APP component subscribes to the Store’s state change event. Following the Flux model, no incremental changes are emitted; when something has changed, all of the state is re-fetched by the APP from the store and React updates its virtual DOM, diffs the changes and applies only the diff to the actual DOM.

I have closely followed the structure of the [Flux TodoMVC example APP][Flux TODOMVC]. Flux was a nice fit for this project because it allowed me to write all of the game logic in one place and just emit changes in state to the APP. This also meant there was little to worry about in terms of component state; components were simply a means of displaying UI and providing interactions, which fed back into the GameStore via actions and the dispatcher.


## CSS

I have used a BEM approach for my CSS, and followed the principles of [ITCSS][ITCSS]. ITCSS is the work of Harry Roberts, and the best reference I have found is the [CSS for his own site][Harry Roberts Github], so I used that as a template for my own CSS structure. There is also a pretty in-depth talk [here][ITCSS talk]. I found this approach excellent for keeping the specificity of selectors very low and keeping CSS to a minimum. I like it a lot.


## Images / design

My design for the cards and the game in general were influenced by a beautiful set of art deco style [Alice in Wonderland playing cards][Playing Cards]. I loosely recreated the deck of cards in Illustrator and exported as individual SVGs. The colour pallet for the game, as well as the font are drawn from the cards. The font is [Didoni URW][Font].


## Rule reference

There are a couple of switches in `/src/js/constants/GamePlay.js` to do with the game play. The first is `DEALER_HIT_ON_SOFT_17`, this is a common rule variation, which determines whether the dealer must draw a card when their current score is 17 and they have a high ace in their hand - a 'soft' 17. The second switch determines the number of rounds per game.

By default the APP is set up with three rounds per game. In each round three points are given for a blackjack win, two for an ordinary win, and one for a draw. These values can be altered in `/src/js/constants/ScoreConstants.js`.

## Future plans for when I get time...

### Game Score
At the moment the APP only keeps track of the score for one game at a time. It would be nice to keep track of a history of games, and give the user a grand total.

### Preferences
Game preferences. Aspects of the gameplay could be exposed as options in a preferences menu.

### Local storage / DB
Save historic games and user preferences to local storage or a database for later retrieval.


## To run locally

Download or clone the repo and run `npm install` (you will also need gulp [installed globally][gulp]). To start the server with livereload just run `gulp`.

### Available gulp tasks

* `gulp` - default task sets environment to development, starts the dev server, compiles assets, and watches for changes
* `gulp build` or `gulp build:production` - build only, with environment set to production
* `gulp faux-production` - same as default task, but with the environment set to production
* `gulp build:development` - build only, with environment set to development

See `gulpfile.js` for more detail on which sub-tasks each top level task is running.

______

This project is built on top of [react-flux-boilerplate][boilerplate].
______

Tom Allen   
[tomjamesallen.co.uk](http://tomjamesallen.co.uk)   
tomjamesallenweb@gmail.com



[Flux TODOMVC]: https://github.com/facebook/flux/tree/master/examples/flux-todomvc

[ITCSS]: http://itcss.io

[Harry Roberts Github]: https://github.com/csswizardry/csswizardry.github.com/tree/master/css

[ITCSS talk]: https://www.youtube.com/watch?v=1OKZOV-iLj4&hd=1

[Font]: https://typekit.com/fonts/didoni-urw

[Playing Cards]: http://www.visualnews.com/2014/09/28/art-deco-alice-in-wonderland-playing-cards-from-turnstyle

[gulp]: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md

[boilerplate]: https://github.com/tomjamesallen/react-flux-boilerplate
