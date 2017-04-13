import React, {Component} from 'react'
// import './App.css'
import SearchBox from './SearchBox'

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
        <p>{this.state.total}</p>
      </div>
    )
  }
}

class ProductLine extends Component {
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

class ProductHeadline extends Component {
  render () {
    return (
      <thead>
        <tr><td>Name</td><td>Price</td></tr>
      </thead>
    )
  }
}

class ProductData extends Component {

  _generateTableGuts () {
    let tableRow = []
    let categories = []
    this.props.catalog.forEach((catalogEntry) => {
      const newItem = categories.indexOf(catalogEntry.category) === -1
      if (newItem) {
        categories.push(catalogEntry.category)
      }
    })

    categories.forEach((currentCategory) => {
      tableRow.push(
        <tr key={currentCategory}>
          <td colSpan='2'><strong>{currentCategory}</strong></td>
        </tr>
      )
      this.props.catalog.forEach((catalogEntry) => {
        let key = `${currentCategory}${catalogEntry.name}`
        tableRow.push(
          <ProductRow
            key={key}
            {...catalogEntry}
            currentCategory={currentCategory}
            searchTerm={this.props.searchTerm}
            inStock={this.props.inStock}
            isBuying={this.props.isBuying}
            onIsBuying={this.props.onIsBuying}
          />
        )

      })
    })
    return tableRow
  }

  render () {
    const tableRow = this._generateTableGuts()
    return (
      <tbody>
        {tableRow}
      </tbody>
    )
  }
}

class ProductRow extends Component {

  handleOnIsBuying (e) {
    const value = e.target.checked
    let key = `${this.props.currentCategory}${this.props.name}`
    this.props.onIsBuying(key, value, this.props.price)
  }

  render () {
    const filterMatch = this.props.name.indexOf(this.props.searchTerm) !== -1
    let style = {color: 'black'}
    if (this.props.currentCategory === this.props.category) {
      if (!this.props.stocked) {
        style.color = 'red'
      }
      let key = `${this.props.currentCategory}${this.props.name}`
      let amIChecked = this.props.isBuying[key] || false
      if (!this.props.inStock || this.props.stocked) {
        if (filterMatch) {
          return(
            <tr>
              <td style={style}>
                <input
                  checked={amIChecked} type="checkbox"
                  onChange={this.handleOnIsBuying.bind(this)}
               />{this.props.name}
              </td>
              <td>${this.props.price}</td>
            </tr>
          )
        }
      }
    }
    return null
  }
}

export default App
