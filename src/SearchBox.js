/**
 * This is a module that provides the top-level search-box
 */

import {Panel, FormGroup, FormControl, Checkbox} from 'react-bootstrap'
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
      <Panel className='SearchBox'>
        <form>
          <FormGroup>
            <FormControl
              id='in-stock-textbox'
              type='text'
              onChange={this.textChangeCallback}
              placeholder='Search...'
              value={this.props.searchTerm} />
            <p>
              <Checkbox
                id='in-stock-checkbox'
                onClick={this.checkboxChangeCallback}
                checked={this.props.inStock}
                type='checkbox'
              >
                Only show products in stock
              </Checkbox>
            </p>
          </FormGroup>
        </form>
      </Panel>
    )
  }
}

SearchBox.propTypes = {
  inStock: PropTypes.bool,
  searchTerm: PropTypes.string,
  onFilterCheckBoxInput: PropTypes.func,
  onFilterTextInput: PropTypes.func
}
