/**
 * @format
 * 
 * this test tests the functions of the shopping list screen
 *  - renders correctly
 *  - cart count shows correctly when items are added
 * 
 */

import 'react-native';
import React from 'react';

import {it, expect} from '@jest/globals';

import { render, screen, fireEvent } from '@testing-library/react-native';
import { useHookstate } from '@hookstate/core';
import { FilteredProducts } from '../store';
import ShoppingList from '../screens/ShoppingList';
import ShoppingListHeader from '../components/ShoppingListHeader';

const TestItems = [{
  name: 'PUMA show 112',
  brandName: 'Puma',
  SKU: 1230,
  id: 0,
  description: 'The iconic retro look of the 112 range',
  colour: 'black',
  sizes: ['8', '9', '10', '11'],
  selectedSize: 0,
  count: 0,
  price: {
    amount: '45.00',
    currency: 'GBP'
  },
  stockStatus: 'IN STOCK',
  mainImage: 'https://'
},{
  name: 'PUMA show 113',
  brandName: 'Puma',
  SKU: 1231,
  id: 1,
  description: 'The iconic retro look of the 112 range',
  colour: 'black',
  sizes: ['8', '9', '10', '11'],
  selectedSize: 0,
  count: 0,
  price: {
    amount: '50.00',
    currency: 'GBP'
  },
  stockStatus: 'IN STOCK',
  mainImage: 'https://'
}]

// this component adds four items directly to global cart state
const TestComponent = () => {
  const products = useHookstate(FilteredProducts);
  
  // only update state if cart is empty
  // since cart state is maintained globally multiple test cases will
  // trigger multiple additions to the state
  if(!products.value.length) {
    products.set(TestItems);
  }

  return (
    <>
      <ShoppingListHeader />
      <ShoppingList />
    </>
  )
}

it('renders correctly', () => {
  render(<TestComponent />);

  const buttons = screen.getAllByText('Add to cart');

  // there should be two rows of data displayed
  expect(buttons).toHaveLength(2);

  // check both items are displayed
  const name1 = screen.getAllByText('PUMA show 112');
  expect(name1).toHaveLength(1);

  const name2 = screen.getAllByText('PUMA show 113');
  expect(name2).toHaveLength(1);

});

it('updates cart count correctly', () => {
  render(<TestComponent />);

  const buttons = screen.getAllByText('Add to cart');

  // add item 1 to cart
  fireEvent.press(buttons[0]);

  const cartCount = screen.getByHintText('cart count');
  expect(cartCount).toHaveTextContent('( 1 )');

  // add item 2 to cart
  fireEvent.press(buttons[1]);
  expect(cartCount).toHaveTextContent('( 2 )');
});