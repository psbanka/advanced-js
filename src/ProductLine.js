import React from 'react'
import {Table} from 'react-bootstrap'
import ProductData from './ProductData'
import PropTypes from 'prop-types'

const {Component} = React

export default class ProductLine extends Component {
  render () {
    return (
      <Table striped bordered condensed hover>
        <ProductData
          searchTerm={this.props.searchTerm}
          inStock={this.props.inStock}
          catalog={this.props.catalog}
          isBuying={this.props.isBuying}
          onIsBuying={this.props.onIsBuying}
        />
      </Table>
    )
  }
}

ProductLine.propTypes = {
  catalog: PropTypes.array,
  searchTerm: PropTypes.string,
  inStock: PropTypes.bool,
  isBuying: PropTypes.object,
  onIsBuying: PropTypes.func
}
