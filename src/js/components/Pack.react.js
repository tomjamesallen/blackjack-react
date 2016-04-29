var React = require('react');

var classNames = require('classnames');

module.exports = React.createClass({

  /**
   * @return {object}
   */
  render() {

    var packEmpty = this.props.remainingCardsInDeck === 0;
    var packImg;

    var classes = classNames(
      'pack',
      {'pack--empty': packEmpty}
    );

    if (!packEmpty) {
      packImg = (
        <div className="card card--concealed">
          <img
            className="card__img"
            src="/img/cards/back.svg" />
        </div>
      );
    }

    return (
      <div className={classes}>
        {packImg}
        <div className="pack__info">
          <p className="pack__card-count">{this.props.remainingCardsInDeck} cards</p>
        </div>
      </div>
    );
  }

});