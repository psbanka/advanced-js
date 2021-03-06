import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {makeKey} from './utils'
import {withRouter} from 'react-router-dom'

class ProductRow extends Component {
  constructor (props) {
    super(props)
    this.handleOnIsBuying = this.handleOnIsBuying.bind(this)
    this.handlePriceEdit = this.handlePriceEdit.bind(this)
    this.onGetDetails = this.onGetDetails.bind(this)
  }

  makeMyKey () {
    return makeKey({
      category: this.props.currentCategory, name: this.props.name
    })
  }

  handleOnIsBuying () {
    let key = this.makeMyKey()
    this.props.onIsBuying(key, this.props.price)
  }

  handlePriceEdit (event) {
    let key = this.makeMyKey()
    this.props.onPriceEdit(key, Number(event.target.value))
  }

  getButton () {
    let key = this.makeMyKey()
    let selected = this.props.isBuying[key] || false
    let button
    if (selected) {
      button = (
        <Button id={key} onClick={this.handleOnIsBuying} bsStyle='success'>Selected</Button>
      )
    } else {
      button = (
        <Button id={key} onClick={this.handleOnIsBuying}>Select</Button>
      )
    }
    return button
  }

  renderInputForEditing () {
    let key = this.makeMyKey()
    let inputKey = `${key}-input`
    if (this.props.isEditing) {
      return (
        <input
          id={inputKey}
          className='price'
          value={this.props.price}
          onChange={this.handlePriceEdit}
        />
      )
    }
    return (
      <span className='price'>{this.props.price}</span>
    )
  }

  onGetDetails () {
    const href = `/product/${this.makeMyKey()}`
    this.props.history.push(href)
  }

  render () {
    const filterMatch = this.props.name.indexOf(this.props.searchTerm) !== -1
    let style = {color: 'black'}
    if (!this.props.stocked) {
      style.color = 'red'
    }

    const button = this.getButton()
    const key = this.makeMyKey()
    const id = `${key}-row`

    if (!this.props.inStock || this.props.stocked) {
      if (filterMatch) {
        return (
          <tr id={id} onClick={this.onGetDetails} className='product' style={style}>
            <td style={{width: '100px'}}>
              {button}
            </td>
            <td>
              {this.props.name}
            </td>
            <td>
              ${this.renderInputForEditing()}
            </td>
          </tr>
        )
      }
    }
    return null
  }
}

ProductRow.propTypes = {
  currentCategory: PropTypes.string,
  name: PropTypes.string,
  stocked: PropTypes.bool,
  price: PropTypes.number,
  searchTerm: PropTypes.string,
  inStock: PropTypes.bool,
  isBuying: PropTypes.object,
  onIsBuying: PropTypes.func,
  onPriceEdit: PropTypes.func,
  isEditing: PropTypes.bool,
  history: PropTypes.object.isRequired
}

export default withRouter(ProductRow)
