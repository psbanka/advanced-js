import React from 'react'
import ReactDOM from 'react-dom'
import ProductData from '../ProductData'
import { shallow, mount, render } from 'enzyme'
import renderer from 'react-test-renderer';

/* global it describe */

const CATALOG = [
  {category: 'things', 'price': 99.99, stocked: false, name: 'bigThing'},
  {category: 'things', 'price': 9.99, stocked: true, name: 'littleThing'},
  {category: 'stuff', 'price': 1.99, stocked: true, name: 'junkyThing'}
]

describe('ProductData', () => {
  it('snapshot check', () => {
    const component = renderer.create(
      <ProductData
        catalog={CATALOG}
        searchTerm=''
        inStock={false}
        isBuying={{}}
        onIsBuying={{}}
      />
    )
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })

  it('renders table', () => {
    const wrapper = shallow(
      <ProductData
        catalog={CATALOG}
        searchTerm=''
        inStock={false}
        isBuying={{}}
        onIsBuying={{}}
      />
    )
    const output = wrapper.instance()._generateTableGuts()
    const expectedKeys = [
      'things',
      'thingsbigThing',
      'thingslittleThing',
      'stuff',
      'stuffjunkyThing'
    ]
    expectedKeys.forEach((key, index) => {
      expect(output[index].key).toBe(key)
    })
  })
})
