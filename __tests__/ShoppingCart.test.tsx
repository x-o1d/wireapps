/**
 * @format
 *
 * this test tests the functions of the shopping cart screen
 *  - renders correctly
 *  - removing items from the cart works
 *
 */

import 'react-native';
import React from 'react';

import {it, expect} from '@jest/globals';

import {render, screen, fireEvent} from '@testing-library/react-native';
import {useHookstate} from '@hookstate/core';
import {Cart} from '../store';
import ShoppingCart from '../screens/ShoppingCart';

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
    currency: 'GBP',
  },
  stockStatus: 'IN STOCK',
  mainImage: 'https://',
};

// this component adds four items directly to global cart state
const TestComponent = () => {
  const cart = useHookstate(Cart);

  // only update state if cart is empty
  // since cart state is maintained globally multiple test cases will
  // trigger multiple additions to the state
  if (!cart.value.length) {
    // add four items where size and the count of items are incremented
    cart.set(p => {
      new Array(4).fill(1).forEach((_, index) => {
        const itemCopy = JSON.parse(JSON.stringify(TestItem));
        itemCopy.selectedSize = index;
        itemCopy.count = index + 1;
        p.push(itemCopy);
      });
      return p;
    });
  }

  return <ShoppingCart />;
};

it('renders correctly', () => {
  render(<TestComponent />);

  const names = screen.getAllByText('PUMA show 112');

  // there should be four rows of data displayed
  expect(names).toHaveLength(4);

  const prices = screen.getAllByHintText('item price');

  // the price should by multiplied by the count correctly
  expect(prices[0]).toHaveTextContent('45.00 GBP');
  expect(prices[1]).toHaveTextContent('90.00 GBP');
  expect(prices[2]).toHaveTextContent('135.00 GBP');
  expect(prices[3]).toHaveTextContent('180.00 GBP');

  const totalPrice = screen.getByHintText('total amount');

  expect(totalPrice).toHaveTextContent('Total: 450.00 GBP');
});

it('removes items from the cart', () => {
  render(<TestComponent />);

  const removeButtons = screen.getAllByAccessibilityHint('remove from cart');

  // remove item 2 with count 2 so that could would be 1
  fireEvent.press(removeButtons[1]);

  const prices = screen.getAllByHintText('item price');

  expect(prices[1]).toHaveTextContent('45.00 GBP');

  // remove item 1 with count 1 so that row would be removed
  fireEvent.press(removeButtons[0]);

  const names = screen.getAllByText('PUMA show 112');
  // there should be three rows of data displayed
  expect(names).toHaveLength(3);

  // total cost should be adjusted
  const totalPrice = screen.getByHintText('total amount');

  expect(totalPrice).toHaveTextContent('Total: 360.00 GBP');
});
