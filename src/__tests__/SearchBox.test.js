import React from 'react'
import ReactDOM from 'react-dom'
import SearchBox from '../SearchBox'
import { shallow, mount, render } from 'enzyme'
import sinon from 'sinon';
import renderer from 'react-test-renderer';

/* global it describe */

describe('SearchBox', () => {
  let onFilterTextInput
  let onFilterCheckBoxInput

  beforeEach(() => {
    onFilterTextInput = sinon.spy();
    onFilterCheckBoxInput = sinon.spy();
  })

  it('SearchBox snapshot check', () => {
    const component = renderer.create(
      <SearchBox
        onFilterTextInput={onFilterTextInput}
        onFilterCheckBoxInput={onFilterCheckBoxInput}
      />
    )
    const json = component.toJSON()
    console.log(json)
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
    textBox.simulate('change', {target: {value: 'ball'}})
    expect(onFilterTextInput.calledOnce).toBe(true);
    expect(onFilterTextInput.callCount).toBe(1);
  })
})
