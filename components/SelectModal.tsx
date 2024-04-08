/*
 * SelectModal renders a modal with the provided select options and calls
 * the provided callback function when an option is pressed.
 *
 * It exposes a show() method in the provided ref object which expects the follwing
 * arguments,
 *
 * selectOptions: string[], string array of options
 * currentValue: number, current selected index
 * callback: (value) => {}, callback called when an option is selected
 *
 * @usage
 * function Screen() {
 *  const selectRef = useRef();
 *  const [selected, setSelected] = useState(0);
 *  return (
 *    <SelectModal
 *      ref={selectRef}
 *      selectionString="Select a letter" />
 *    <Button onPress={() => {
 *      selectRef.current.show(['a','b','c'], selected, (value: number) => {
 *        setSelected(value);
 *      })
 *    }}/>
 *  )
 * }
 *
 * @refer __tests__/SelectModal.test.tsx for a sample implementation
 */

import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';

const SelectModal = forwardRef(function SelectModal(
  props: {
    selectionString: string;
  },
  ref,
) {
  const [showModal, setShowModal] = useState(false);
  const [selectOptions, setSelectOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState(0);
  const changeFunction = useRef<Function>(() => {});

  useImperativeHandle(
    ref,
    () => {
      return {
        show(options: string[], value: number, onChange: Function) {
          setSelectOptions(options);
          setSelected(value);
          changeFunction.current = onChange;
          setShowModal(true);
        },
      };
    },
    [],
  );

  const onSelect = (index: number) => {
    changeFunction.current(index);
    setSelectOptions([]);
    setShowModal(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}>
      <View style={styles.modal}>
        <View style={styles.centered}>
          <Text style={styles.titleText}>{props.selectionString}:</Text>
          {selectOptions.map((option, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.selectArea}
                onPress={() => onSelect(index)}
                accessibilityHint="select option">
                <View
                  style={[
                    styles.selectButton,
                    index === selected ? styles.selectActive : null,
                  ]}>
                  <Text>{option}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  centered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#35b8b1',
    padding: 10,
    borderRadius: 10,
    paddingBottom: 15,
  },
  titleText: {
    fontSize: 15,
    color: 'black',
    paddingBottom: 5,
  },
  selectArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  selectButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  selectActive: {
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
  },
});
export default SelectModal;
