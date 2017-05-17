import React from 'react'
import ButtonBar from '../ButtonBar'
import { shallow } from 'enzyme'

/* global jest describe it beforeEach */

describe('Basic ButtonBar', () => {
  let wrapper, callback

  beforeEach(() => {
    callback = jest.fn()

    wrapper = shallow(
      <ButtonBar
        isEditing={false}
        onEditToggle={callback}
      />
    )
  })

  it('will render edit button and not save/cancel', () => {
    expect(wrapper.find('#save-button').exists()).toBe(false)
    expect(wrapper.find('#cancel-button').exists()).toBe(false)
    expect(wrapper.find('#edit-button').exists()).toBe(true)
  })

  it('will call its callback when edit is clicked', () => {
    wrapper.find('#edit-button').simulate('click')
    expect(callback.mock.calls).toEqual([[]])
  })
})

describe('Editing ButtonBar', () => {
  let wrapper, callback

  beforeEach(() => {
    callback = jest.fn()

    wrapper = shallow(
      <ButtonBar
        isEditing={true}
        onEditToggle={callback}
      />
    )
  })

  it('will render save/cancel buttons and not edit', () => {
    expect(wrapper.find('#save-button').exists()).toBe(true)
    expect(wrapper.find('#cancel-button').exists()).toBe(true)
    expect(wrapper.find('#edit-button').exists()).toBe(false)
  })

  it('will call its callback when cancel is clicked', () => {
    wrapper.find('#cancel-button').simulate('click')
    expect(callback.mock.calls).toEqual([[]])
  })
})
