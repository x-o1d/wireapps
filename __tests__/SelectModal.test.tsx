/**
 * this test tests the functions of an individual product list item
 *  - renders correctly
 *  - selecting an option triggers the callback with the right value
 */

import 'react-native';
import React, {useRef} from 'react';

import {it, expect, jest} from '@jest/globals';

import {render, screen, fireEvent} from '@testing-library/react-native';
import SelectModal from '../components/SelectModal';
import {Button} from 'react-native';

const mockCallback = jest.fn();

// this component adds four items directly to global cart state
const TestComponent = () => {
  const selectRef = useRef<any>();

  const showModal = () => {
    selectRef.current?.show(['a', 'b', 'c'], 0, mockCallback);
  };

  return (
    <>
      <SelectModal ref={selectRef} selectionString="Select size" />
      <Button title="press" onPress={showModal} />
    </>
  );
};

it('renders correctly', () => {
  render(<TestComponent />);

  const button = screen.getByText('press');

  fireEvent.press(button);

  // all three options should be shown
  const options = screen.getAllByHintText('select option');

  expect(options).toHaveLength(3);
  expect(options[0]).toHaveTextContent('a');
  expect(options[1]).toHaveTextContent('b');
  expect(options[2]).toHaveTextContent('c');
});

it('should call the callback when an option is pressed', () => {
  render(<TestComponent />);

  const button = screen.getByText('press');

  fireEvent.press(button);

  const options = screen.getAllByHintText('select option');
  // select first option
  fireEvent.press(options[0]);

  expect(mockCallback).toBeCalledWith(0);

  // show modal again
  fireEvent.press(button);
  const options2 = screen.getAllByHintText('select option');
  // select third option
  fireEvent.press(options2[2]);

  expect(mockCallback).toBeCalledWith(2);
});
