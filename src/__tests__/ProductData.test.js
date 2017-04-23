import React from 'react'
import ProductData from '../ProductData'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

/* global it describe expect jest */

const CATALOG = [
  {category: 'things', 'price': 99.99, stocked: false, name: 'bigThing'},
  {category: 'things', 'price': 9.99, stocked: true, name: 'littleThing'},
  {category: 'stuff', 'price': 1.99, stocked: true, name: 'junkyThing'}
]

describe('ProductData', () => {
  it('does a snapshot check', () => {
    const component = renderer.create(
      <ProductData
        catalog={CATALOG}
        searchTerm=''
        inStock={false}
        isBuying={{}}
        onIsBuying={jest.fn()}
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
        onIsBuying={jest.fn()}
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
