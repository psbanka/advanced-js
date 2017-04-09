import React, { Component } from 'react'
import './App.css'
import SearchBox from './SearchBox'

const SERVER_DATA = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
]

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      inStock: false
    }
  }

  onFilterTextInput (e) {
    this.setState({searchTerm: e.target.value})
  }

  onFilterCheckBoxInput (e) {
    this.setState({inStock: e.target.value === 'on'})
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
        />
      </div>
    )
  }
}

class ProductLine extends Component {
  static propTypes = {
    catalog: React.PropTypes.array,
    searchTerm: React.PropTypes.string,
    inStock: React.PropTypes.bool
  }

  render () {
    return (
      <table>
        <ProductHeadline />
        <ProductData
          searchTerm={this.props.searchTerm}
          inStock={this.props.inStock}
          catalog={this.props.catalog} />
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
  static propTypes = {
    catalog: React.PropTypes.array,
    searchTerm: React.PropTypes.string,
    inStock: React.PropTypes.bool
  }

  render () {
    let tableGuts = []
    let categories = []
    this.props.catalog.forEach((catalogEntry) => {
      const newItem = categories.indexOf(catalogEntry.category) === -1
      if (newItem) {
        categories.push(catalogEntry.category)
      }
    })

    categories.forEach((category) => {
      let key
      tableGuts.push(<tr key={category}><td colSpan='2'><strong>{category}</strong></td></tr>)
      this.props.catalog.forEach((catalogEntry) => {
        const filterMatch = catalogEntry.name.indexOf(this.props.searchTerm) !== -1
        let style = {color: 'black'}
        if (category === catalogEntry.category) {
          if (!catalogEntry.stocked) {
            style.color = 'red'
          }
          key = `${category}${catalogEntry.name}`
          if (!this.props.inStock || catalogEntry.stocked) {
            if (filterMatch) {
              tableGuts.push(<tr key={key}><td style={style}>{catalogEntry.name}</td><td>{catalogEntry.price}</td></tr>)
            }
          }
        }
      })
    })

    return (
      <tbody>
        {tableGuts}
      </tbody>
    )
  }
}

export default App
