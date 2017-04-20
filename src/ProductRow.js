import React, {Component} from 'react'

/**
 * converts category and name to a valid key string
 * @param {String} category - the name of the category
 * @param {String} name - the name of the string
 * @returns {String} - valid HTML id
 */
export function makeKey(category, name) {
  const convertedCategory = category.toLowerCase().replace(/ /g, '-')
  const convertedName = name.toLowerCase().replace(/ /g, '-')
  return `${convertedCategory}-${convertedName}`
}

export default class ProductRow extends Component {

  handleOnIsBuying (e) {
    const value = e.target.checked
    let key = `${this.props.currentCategory}${this.props.name}`
    this.props.onIsBuying(key, value, this.props.price)
  }

  render () {
    const filterMatch = this.props.name.indexOf(this.props.searchTerm) !== -1
    let style = {color: 'black'}
    if (!this.props.stocked) {
      style.color = 'red'
    }
    let key = makeKey(this.props.currentCategory, this.props.name)
    let amIChecked = this.props.isBuying[key] || false
    if (!this.props.inStock || this.props.stocked) {
      if (filterMatch) {
        return(
          <tr className="product" style={style}>
            <td>
              <input
                id={key}
                checked={amIChecked} type="checkbox"
                onChange={this.handleOnIsBuying.bind(this)}
             />{this.props.name}
            </td>
            <td>${this.props.price}</td>
          </tr>
        )
      }
    }
    return null
  }
}
