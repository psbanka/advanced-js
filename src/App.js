import React, {Component} from 'react'
import './App.css'
import SearchBox from './SearchBox'
import ProductLine from './ProductLine'

const SERVER_DATA = [
  {category: 'Sporting Goods', price: 49.99, stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: 9.99, stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: 29.99, stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: 99.99, stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: 399.99, stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: 199.99, stocked: true, name: 'Nexus 7'}
]

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      inStock: false,
      isBuying: {},
      total: 0
    }
  }

  /*
   * isBuying = {
   *   'Sporting GoodsBasketball': true,
   *   'ElectronicsNexus 7': true
   * }
   */

  onFilterTextInput (e) {
    this.setState({searchTerm: e.target.value})
  }

  onFilterCheckBoxInput (e) {
    this.setState({inStock: e.target.checked})
  }

  /**
   * a user has clicked a row
   * @param key {String} - combination of category and name to uniquely
   *   identify a row
   * @param value {bool} - selected or not
   * @param price {Number} - how much it costs
   */
  onIsBuying(key, value, price) {
    let newTotal
    if (value) {
      newTotal = this.state.total + price
    } else {
      newTotal = this.state.total - price
    }

    // Hey! if you want a variable as a key, put it in brackets!
    let newBuyObject = Object.assign(this.state.isBuying, {[key]: value})
    this.setState({isBuying: newBuyObject, total: newTotal})
  }

  render () {
    return (
      <div>
        <SearchBox
          searchTerm={this.state.searchTerm}
          inStock={this.state.inStock}
          onFilterTextInput={this.onFilterTextInput.bind(this)}
          onFilterCheckBoxInput={this.onFilterCheckBoxInput.bind(this)}
        />
        <ProductLine
          catalog={SERVER_DATA}
          searchTerm={this.state.searchTerm}
          inStock={this.state.inStock}
          isBuying={this.state.isBuying}
          onIsBuying={this.onIsBuying.bind(this)}
        />
        <p id='total-box'>{this.state.total}</p>
      </div>
    )
  }
}

export default App
