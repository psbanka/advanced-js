import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {makeKey} from './utils'

export default class ProductRow extends Component {
  constructor (props) {
    super(props)
    this.handleOnIsBuying = this.handleOnIsBuying.bind(this)
  }

  handleOnIsBuying () {
    let key = makeKey(this.props.currentCategory, this.props.name)
    this.props.onIsBuying(key, this.props.price)
  }

  getButton () {
    let key = makeKey(this.props.currentCategory, this.props.name)
    let selected = this.props.isBuying[key] || false
    let button
    if (selected) {
      button = (
        <Button id={key} onClick={this.handleOnIsBuying} bsStyle="success">Selected</Button>
      )
    } else {
      button = (
        <Button id={key} onClick={this.handleOnIsBuying}>Select</Button>
      )
    }
    return button
  }

  render () {
    const filterMatch = this.props.name.indexOf(this.props.searchTerm) !== -1
    let style = {color: 'black'}
    if (!this.props.stocked) {
      style.color = 'red'
    }
    const button = this.getButton()

    if (!this.props.inStock || this.props.stocked) {
      if (filterMatch) {
        return (
          <tr className='product' style={style}>
            <td style={{width: '100px'}}>
              {button}
            </td>
            <td>
              {this.props.name}
            </td>
            <td>${this.props.price}</td>
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
  onIsBuying: PropTypes.func
}
