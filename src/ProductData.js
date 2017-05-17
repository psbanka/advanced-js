import React, {Component} from 'react'
import ProductRow from './ProductRow'
import PropTypes from 'prop-types'

export default class ProductData extends Component {
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
        if (currentCategory === catalogEntry.category) {
          tableRow.push(
            <ProductRow
              key={key}
              {...catalogEntry}
              currentCategory={currentCategory}
              searchTerm={this.props.searchTerm}
              inStock={this.props.inStock}
              isBuying={this.props.isBuying}
              onIsBuying={this.props.onIsBuying}
              isEditing={this.props.isEditing}
            />
          )
        }
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

ProductData.propTypes = {
  catalog: PropTypes.array,
  searchTerm: PropTypes.string,
  inStock: PropTypes.bool,
  isBuying: PropTypes.object,
  onIsBuying: PropTypes.func,
  isEditing: PropTypes.bool
}
