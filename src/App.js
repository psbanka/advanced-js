import React, {Component} from 'react'
import './App.css'
import SearchBox from './SearchBox'
import ProductLine from './ProductLine'

/* global fetch */

const SERVER_ROOT = 'https://inventory-58a07.firebaseio.com'

/* eslint-disable no-unused-vars */
/*
 * If you want an example of why we NEVER block, try
 * calling this "sleep" function in the onIsBuying() method
 * down below and see what happens to the browser!
 */
function sleep (timeout) {
  console.log('start sleep')
  const start = new Date()
  for (let i = 0; i >= 0; i += 1) {
    let now = new Date()
    let diff = now - start
    if (diff > timeout) {
      break
    }
  }
  console.log('end sleep')
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      inStock: false,
      isBuying: {},
      total: 0,
      catalog: []
    }
    this.onFilterTextInput = this.onFilterTextInput.bind(this)
    this.onFilterCheckBoxInput = this.onFilterCheckBoxInput.bind(this)
    this.onIsBuying = this.onIsBuying.bind(this)
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
  onIsBuying (key, value, price) {
    let newTotal
    if (value) {
      newTotal = this.state.total + price
    } else {
      newTotal = this.state.total - price
    }

    // Hey! if you want a variable as a key, put it in brackets!
    let newBuyObject = Object.assign(this.state.isBuying, {[key]: value})
    this.setState({isBuying: newBuyObject, total: newTotal})

    // Give this a try if you want to see what happens when JavaScript blocks!
    // sleep(2000)
  }

  /*
  myAsyncFunction () {
    return new Promise.resolve(2, 3, 4, 5)
  }
  */

  // LIFECYCLE METHODS ----------------------------------------

  componentWillMount () {
    /*
    this.myAsyncFunction()
      .then((a, b, c, d) => {
        console.log(a, b, c, d)
      })
    */

    fetch(`${SERVER_ROOT}/catalog.json`)
      .then((response) => {
        console.log('the server responded')
        return response.json()
      })
      .then((catalog) => {
        console.log(catalog)
        this.setState({catalog})
      })
      .catch((error) => {
        console.log('server hates us')
        console.log(error)
      })
  }

  render () {
    return (
      <div>
        <SearchBox
          searchTerm={this.state.searchTerm}
          inStock={this.state.inStock}
          onFilterTextInput={this.onFilterTextInput}
          onFilterCheckBoxInput={this.onFilterCheckBoxInput}
        />
        <ProductLine
          catalog={this.state.catalog}
          searchTerm={this.state.searchTerm}
          inStock={this.state.inStock}
          isBuying={this.state.isBuying}
          onIsBuying={this.onIsBuying}
        />
        <p id='total-box'>{this.state.total}</p>
      </div>
    )
  }
}

export default App
