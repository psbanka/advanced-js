import React from 'react'
import SearchBox from '../SearchBox'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

/* global it describe expect beforeEach jest */

describe('SearchBox', () => {
  let onFilterTextInput
  let onFilterCheckBoxInput

  beforeEach(() => {
    onFilterTextInput = jest.fn()
    onFilterCheckBoxInput = jest.fn()
  })

  it('does a snapshot check', () => {
    const component = renderer.create(
      <SearchBox
        onFilterTextInput={onFilterTextInput}
        onFilterCheckBoxInput={onFilterCheckBoxInput}
      />
    )
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })

  it('will make proper callback when adding search text', () => {
    const searchBox = shallow(
      <SearchBox
        onFilterTextInput={onFilterTextInput}
        onFilterCheckBoxInput={onFilterCheckBoxInput}
      />
    )
    const textBox = searchBox.find('#in-stock-textbox')
    const event = {target: {value: 'ball'}}
    textBox.simulate('change', event)
    expect(onFilterTextInput).toBeCalledWith(event)
  })
})
