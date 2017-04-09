import React, { Component } from 'react'

export default class SearchBox extends Component {
  constructor (props) {
    super(props)
  }

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
      <div>
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
