/**
 * This is a module that provides the top-level search-box
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './SearchBox.css'

export default class SearchBox extends Component {
  constructor (props) {
    super(props)
    this.textChangeCallback = this.props.onFilterTextInput.bind(this)
    this.checkboxChangeCallback = this.props.onFilterCheckBoxInput.bind(this)
  }

  render () {
    return (
      <div className='SearchBox'>
        <button style={{color: 'red'}}>Confirm</button>
        <input
          id='in-stock-textbox'
          type='text'
          onChange={this.textChangeCallback}
          placeholder='Search...'
          value={this.props.searchTerm} />
        <p>
          <input
            id='in-stock-checkbox'
            onClick={this.checkboxChangeCallback}
            checked={this.props.inStock}
            type='checkbox' />
          Only show products in stock
        </p>
      </div>
    )
  }
}

SearchBox.propTypes = {
  inStock: PropTypes.bool,
  searchTerm: PropTypes.string,
  onFilterCheckBoxInput: PropTypes.func,
  onFilterTextInput: PropTypes.func
}
