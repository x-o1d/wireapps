/**
 * this test tests the functions of an individual product list item
 *  - renders correctly
 *  - incrementing and decrementing values work
 */

import 'react-native';
import React, { useRef } from 'react';

import {it, expect, jest } from '@jest/globals';

import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from 'react-native';
import QuantityModal from '../components/QuantityModal';

const mockCallback = jest.fn();

// this component adds four items directly to global cart state
const TestComponent = () => {

  const quantityRef = useRef<any>();

  const showModal = () => {
    quantityRef.current?.show(2, mockCallback)
  }

  return (
    <>
      <QuantityModal
        ref={quantityRef}/>
      <Button
        title='press'
        onPress={showModal} />
    </>
  )
}

it('renders correctly', () => {
  render(<TestComponent />);

  const button = screen.getByText('press');

  fireEvent.press(button);

  // all three options should be shown
  const quantityText = screen.getByHintText('quantity');

  expect(quantityText).toHaveTextContent('2');
});

it('should work properly when incremented and decremented', () => {
  render(<TestComponent />);

  const button = screen.getByText('press');

  fireEvent.press(button);

  const leftArrow = screen.getByHintText('decrement arrow');
  const rightArrow = screen.getByHintText('increment arrow');
  // decrement value
  fireEvent.press(leftArrow);

  expect(mockCallback).toBeCalledWith(1);

  // increment value
  fireEvent.press(rightArrow);
  expect(mockCallback).toBeCalledWith(2);

  // increment again
  fireEvent.press(rightArrow);
  expect(mockCallback).toBeCalledWith(3);
});