import {Alert, PageHeader, Panel, Well, Col, Grid} from 'react-bootstrap'
import React, {Component} from 'react'
import './App.css'
import SearchBox from './SearchBox'
import ProductLine from './ProductLine'
import ButtonBar from './ButtonBar'
import {makeKey} from './utils'

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
      message: '',
      total: 0
    }
    this.onFilterTextInput = this.onFilterTextInput.bind(this)
    this.onFilterCheckBoxInput = this.onFilterCheckBoxInput.bind(this)
    this.onIsBuying = this.onIsBuying.bind(this)
    this.onEditToggle = this.onEditToggle.bind(this)
    this.onPriceEdit = this.onPriceEdit.bind(this)
    this.onSave = this.onSave.bind(this)
    this.dismissMessage = this.dismissMessage.bind(this)
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
   * Updates the price of the item identified by the key provided
   * @param {String} key - e.g. 'sporting-goods-football'
   * @param {String} price - the new price to be set
   */
  onPriceEdit (key, price) {
    const newEditingCatalog = this.state.editingCatalog.map((x) => Object.assign({}, x))
    newEditingCatalog.forEach((item) => {
      if (makeKey(item) === key) {
        item.price = price
      }
    })
    this.setState({editingCatalog: newEditingCatalog})
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
    let editingCatalog = this.state.catalog.map((x) => Object.assign({}, x))
    this.setState({
      isEditing: !this.state.isEditing,
      editingCatalog: editingCatalog
    })
  }

  /**
   * Send this.state.editingCatalog up to the server and *optimistically*
   * replace our catalog with editingCatalog.
   */
  onSave () {
    fetch(`${SERVER_URL}/catalog.json`, {
      method: 'PUT',
      body: JSON.stringify(this.state.editingCatalog)
    })
      .then((response) => response.json())
      .then((data) => {
        // The server responds with what *it* thinks the data should be
        // This should match what we think, but it *might not*, so we set it
        this.setState({catalog: data, message: 'Saved.'})
      })
    let newCatalog = this.state.editingCatalog.map((x) => Object.assign({}, x))
    this.setState({
      isEditing: false,
      catalog: newCatalog,
      editingCatalog: [],
      message: 'Saving...'
    })
  }

  dismissMessage () {
    this.setState({message: ''})
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
    let messageBox = null
    if (this.state.message) {
      messageBox = (
        <Alert
          onDismiss={this.dismissMessage}
          id='message-box'
          bsStyle='warning'
        >
          <p id='#message'>{this.state.message}</p>
        </Alert>
      )
    }
    return (
      <Grid>
        <Col xs={12} md={8}>
          <Panel footer='&copy;2017 SuperGoods International, LLC'>
            {messageBox}
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
              catalog={this.state.isEditing ? this.state.editingCatalog : this.state.catalog}
              searchTerm={this.state.searchTerm}
              inStock={this.state.inStock}
              isBuying={this.state.isBuying}
              onIsBuying={this.onIsBuying}
              isEditing={this.state.isEditing}
              onPriceEdit={this.onPriceEdit}
            />
            <Well>
              <p id='total-box'>Total: ${this.state.total}</p>
            </Well>
            <ButtonBar
              onEditToggle={this.onEditToggle}
              onSave={this.onSave}
              isEditing={this.state.isEditing}
            />
          </Panel>
        </Col>
      </Grid>
    )
  }
}

export default App
