/**
 * this test tests the functions of an individual product list item
 *  - renders correctly
 *  - adding to cart works
 *  - change size and adding to cart works
 */

import 'react-native';
import React from 'react';
import ListProduct from '../components/ShoppingListItem';

import {it, expect} from '@jest/globals';

import { render, screen, fireEvent } from '@testing-library/react-native';
import { useHookstate } from '@hookstate/core';
import { FilteredProducts } from '../store';

// this object emulates the SizeModal behaviour by incrementing the
// size to the next index when show() is called
const sizeSelector = {
  current: {
    show(a: string[], b: number, c: Function) {
      // emulate size change to + 1
      c(b+1);
    }
  }
}

const TestItem = {
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
}

// this component adds an item to the global state 
// this is neccesary because size selection directly changes
// global state
const TestComponent = () => {
  const products = useHookstate(FilteredProducts);
  products.set([TestItem])
  return (
    <ListProduct 
      item={products.value[0]}
      sizeSelector={sizeSelector}/>
  )
}

it('renders correctly', () => {
  render(<TestComponent />);

  const nameText = screen.getByText('PUMA show 112');
  const colourText = screen.getByText('Colour: black');
  const priceText = screen.getByText('45.00 GBP');

  expect(nameText).toBeOnTheScreen();
  expect(colourText).toBeOnTheScreen();
  expect(priceText).toBeOnTheScreen();
});

it('shows the correct cart count after adding to cart', () => {
  render(<TestComponent />);

  const cartButton = screen.getByText('Add to cart');
  
  // add item to cart
  fireEvent.press(cartButton);

  const cartCount = screen.getByText(/^x/g);
  //cart count should display 1
  expect(cartCount).toHaveTextContent('x 1');

  // add another item to cart
  fireEvent.press(cartButton);
  //cart count should display 2
  expect(cartCount).toHaveTextContent('x 2');
})

it('shows the correct cart count after changing size', () => {
  render(<TestComponent />);

  const cartButton = screen.getByText('Add to cart');
  const sizeButton = screen.getByText(/^Size:/g);
  
  // add three items to cart
  fireEvent.press(cartButton);
  fireEvent.press(cartButton);
  fireEvent.press(cartButton);

  const cartCount = screen.getByText(/^x/g);

  //cart count should display 5 (two added from the previous test)
  expect(cartCount).toHaveTextContent('x 5');

  // change size
  fireEvent.press(sizeButton);

  // add two items to cart
  fireEvent.press(cartButton);
  fireEvent.press(cartButton);

  // the previous element gets unmounted during the size change
  const cartCount2 = screen.getByText(/^x/g);
  //cart count should display 2
  expect(cartCount2).toHaveTextContent('x 2');

  // change size again
  fireEvent.press(sizeButton);

  // add an item to cart
  fireEvent.press(cartButton);

  const cartCount3 = screen.getByText(/^x/g);
  //cart count should display 2
  expect(cartCount3).toHaveTextContent('x 1');
})