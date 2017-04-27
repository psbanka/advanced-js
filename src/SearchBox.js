/**
 * This is a module that provides the top-level search-box
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './SearchBox.css'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'

export default class SearchBox extends Component {
  constructor (props) {
    super(props)
    this.textChangeCallback = this.props.onFilterTextInput.bind(this)
    this.checkboxChangeCallback = this.props.onFilterCheckBoxInput.bind(this)
  }

  render () {
    return (
      <div>
        <TextField
          hintText='Search...'
          floatingLabelText='Search for a product'
          onChange={this.textChangeCallback}
          value={this.props.searchTerm}
        />
        <Checkbox
          label='Only show products in stock'
          id='in-stock-checkbox'
          onClick={this.checkboxChangeCallback}
          checked={this.props.inStock}
        />
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
