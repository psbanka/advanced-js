import {PageHeader, Panel, Well, Col, Grid} from 'react-bootstrap'
import React, {Component} from 'react'
import './App.css'
import SearchBox from './SearchBox'
import ProductLine from './ProductLine'
import ButtonBar from './ButtonBar'

/* global fetch */

const SERVER_URL = 'https://inventory-58a07.firebaseio.com'

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
      catalog: [],
      editingCatalog: [],
      searchTerm: '',
      inStock: false,
      isEditing: false,
      isBuying: {},
      total: 0
    }
    this.onFilterTextInput = this.onFilterTextInput.bind(this)
    this.onFilterCheckBoxInput = this.onFilterCheckBoxInput.bind(this)
    this.onIsBuying = this.onIsBuying.bind(this)
    this.onEditToggle = this.onEditToggle.bind(this)
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
   * @param price {Number} - how much it costs
   */
  onIsBuying (key, price) {
    const oldValue = this.state.isBuying[key] || false
    const value = !oldValue
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

  /**
    * Toggles this.state.isEditing when the button is clicked in
    * ButtonBar
    */
  onEditToggle () {
    let editingCatalog
    this.setState({
      isEditing: !this.state.isEditing,
      editingCatalog: []
    })
  }

  componentWillMount () {
    fetch(`${SERVER_URL}/catalog.json`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({catalog: data})
      })
  }

  render () {
    return (
      <Grid>
        <Col xs={12} md={8}>
          <Panel footer='&copy;2017 SuperGoods International, LLC'>
            <PageHeader>
              Welcome SuperGoods <small>We have lots of stuff!</small>
            </PageHeader>
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
            <Well>
              <p id='total-box'>Total: ${this.state.total}</p>
            </Well>
            <ButtonBar
              onEditToggle={this.onEditToggle}
              isEditing={this.state.isEditing}
            />
          </Panel>
        </Col>
      </Grid>
    )
  }
}

export default App
