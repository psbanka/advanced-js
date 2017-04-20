import React from 'react'
const {Component} = React
import ProductHeadline from './ProductHeadline'
import ProductData from './ProductData'

export default class ProductLine extends Component {
  render () {
    return (
      <table>
        <ProductHeadline />
        <ProductData
          searchTerm={this.props.searchTerm}
          inStock={this.props.inStock}
          catalog={this.props.catalog}
          isBuying={this.props.isBuying}
          onIsBuying={this.props.onIsBuying}
        />
      </table>
    )
  }
}

