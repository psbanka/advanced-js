import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {makeKey} from './utils'
import {Well} from 'react-bootstrap'

export default class Details extends Component {
  render () {
    if (!this.props.match) {
      console.log('this.props.match does not exist')
      return
    }

    const expectedKey = this.props.match.params.id
    const myProduct = this.props.catalog.find((product) => {
      const key = makeKey(product)
      return key === expectedKey
    })
    if (myProduct === undefined) return null
    return (
      <Well>
        <h1>{myProduct.name}</h1>
        {myProduct.description}
      </Well>
    )
  }
}

Details.propTypes = {
  match: PropTypes.object.isRequired,
  catalog: PropTypes.array.isRequired
}
