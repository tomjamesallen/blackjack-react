/**
 * Borrowed from 'Building a Polling App with Socket IO and React.js' on
 * Lynda.com
 * http://www.lynda.com/Web-Development-tutorials/Building-Polling-App-Socket-IO-React-js/387145-2.html
 *
 * Helper component which shows or hides its contents based on an if property.
 */
import React, { PropTypes } from 'react'

let Display = React.createClass({
  propTypes: {
    className: PropTypes.node,
    if: PropTypes.bool,
    children: PropTypes.node
  },

  render() {
    return (this.props.if) ? <div className={this.props.className || null}>{this.props.children}</div> : null
  }
})

export default Display
