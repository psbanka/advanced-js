import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

export default class ButtonBar extends Component {
  constructor (props) {
    super(props)
    this.handleOnEditToggle = this.handleOnEditToggle.bind(this)
  }

  handleOnEditToggle () {
    this.props.onEditToggle()
  }

  render () {
    if (this.props.isEditing) {
      return (
        <div>
          <button
            id='save-button'
          >
            Save
          </button>
          <button
            id='cancel-button'
            onClick={this.handleOnEditToggle}
          >
            Cancel
          </button>
        </div>
      )
    }
    return (
      <button
        id='edit-button'
        onClick={this.handleOnEditToggle}
      >
        Edit
      </button>
    )
  }
}

ButtonBar.propTypes = {
  isEditing: PropTypes.bool,
  onEditToggle: PropTypes.func
}
