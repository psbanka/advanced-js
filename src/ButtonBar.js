import React, {Component} from 'react'
import {Button, ButtonToolbar} from 'react-bootstrap'
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
        <ButtonToolbar>
          <Button
            bsStyle='primary'
            id='save-button'
          >
            Save
          </Button>
          <Button
            id='cancel-button'
            onClick={this.handleOnEditToggle}
          >
            Cancel
          </Button>
        </ButtonToolbar>
      )
    }
    return (
      <ButtonToolbar>
        <Button
          id='edit-button'
          onClick={this.handleOnEditToggle}
          bsStyle='primary'
        >
          Edit
        </Button>
      </ButtonToolbar>
    )
  }
}

ButtonBar.propTypes = {
  isEditing: PropTypes.bool,
  onEditToggle: PropTypes.func
}
