import React from 'react'
import ButtonBar from '../ButtonBar'
import { shallow } from 'enzyme'

/* global jest describe it beforeEach expect */

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
  let wrapper, editCallback, saveCallback

  beforeEach(() => {
    editCallback = jest.fn()
    saveCallback = jest.fn()

    wrapper = shallow(
      <ButtonBar
        isEditing
        onEditToggle={editCallback}
        onSave={saveCallback}
      />
    )
  })

  it('will render save/cancel buttons and not edit', () => {
    expect(wrapper.find('#save-button').exists()).toBe(true)
    expect(wrapper.find('#cancel-button').exists()).toBe(true)
    expect(wrapper.find('#edit-button').exists()).toBe(false)
  })

  it('will call its edit callback when cancel is clicked', () => {
    wrapper.find('#cancel-button').simulate('click')
    expect(editCallback.mock.calls).toEqual([[]])
  })

  it('will call its save callback when save is clicked', () => {
    wrapper.find('#save-button').simulate('click')
    expect(saveCallback.mock.calls).toEqual([[]])
  })
})
