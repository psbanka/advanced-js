import React, { Component } from 'react';
import './App.css';
import SearchBox from './SearchBox'

const SERVER_DATA = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"},
];

class App extends Component {

  render() {
    return (
      <div>
        <input placeholder="Search..."/>
        <p><input type='checkbox'/>Only show products in stock</p>
        <table>
          <thead>
            <tr><td>Name</td><td>Price</td></tr>
          </thead>
          <tbody>
            <tr><td colSpan={2}>Sporting Goods</td></tr>
            <tr><td>football</td><td>$49.99</td></tr>
            <tr><td colSpan={2}>Electronics</td></tr>
            <tr><td>ipad</td><td>$399.99</td></tr>
          </tbody>
        </table>
      </div>
    )
  }
}

class ProductLine extends Component {
  static propTypes = {
    catalog: React.PropTypes.array,
    searchTerm: React.PropTypes.string,
    inStock: React.PropTypes.bool,
  }

  render () {
    return (
      <table>
        <ProductHeadline/>
        <ProductData
          searchTerm={this.props.searchTerm}
          inStock={this.props.inStock}
          catalog={this.props.catalog}/>
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
    inStock: React.PropTypes.bool,
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
      tableGuts.push(<tr key={category}><td colSpan="2"><strong>{category}</strong></td></tr>)
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

export default App;
