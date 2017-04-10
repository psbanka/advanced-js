/**
 * This is a module that provides the top-level search-box
 */

import React, { Component } from 'react'
import './SearchBox.css'

export default class SearchBox extends Component {
  static propTypes = {
    searchTerm: React.PropTypes.string,
    inStock: React.PropTypes.bool,
    onFilterTextInput: React.PropTypes.func,
    onFilterCheckBoxInput: React.PropTypes.func
  }

  render () {
    const textChangeCallback = this.props.onFilterTextInput.bind(this)
    const checkboxChangeCallback = this.props.onFilterCheckBoxInput.bind(this)
    return (
      <div className='SearchBox'>
        <button style={{color: 'red'}}>Confirm</button>
        <input
          type='text'
          onChange={textChangeCallback}
          placeholder='Search...'
          value={this.props.searchTerm} />
        <p>
          <input
            onChange={checkboxChangeCallback}
            checked={this.props.inStock}
            type='checkbox' />Only show products in stock
        </p>
      </div>
    )
  }
}
