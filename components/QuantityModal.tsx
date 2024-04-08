/*
 * QuantityModal renders a modal with the current quantity and two arrows
 * to increment and decrement quantity.
 * 
 * It exposes a show() method in the provided ref object which expects the follwing
 * arguments,
 * 
 * currentQuantity: snumber, initial quantity
 * callback: (value) => {}, callback called when the quantity is changed
 * 
 * @usage
 * function Screen() {
 *  const quantityRef = useRef();
 *  const [quantity, setQuantity] = useState(0);
 *  return (
 *    <QuantityModal 
 *      ref={selectRef} 
 *      selectionString="Select a letter" />
 *    <Button onPress={() => {
 *      selectRef.current.show(quantity, (value: number) => {
 *        setQuantity(value);
 *      })
 *    }}/>
 *  )
 * }
 * 
 * @refer __tests__/QuantityModal.test.tsx for a sample implementation
 */

import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import VectorImage from "react-native-vector-image";

const QuantityModal = forwardRef(function SelectModal({}, ref) {
  const [showModal, setShowModal] = useState(false);
  const [ quantity, setQuantity ] = useState(1);
  const changeFunction = useRef<Function>(() => {});
  
  useImperativeHandle(ref, () => {
    return {
      show(quantity: number, onChange: Function) {
        setQuantity(quantity);
        changeFunction.current = onChange;
        setShowModal(true);
      },
    };
  }, []);

  const decrementQuantity = () => {
    if(quantity > 1) {
      changeFunction.current(quantity - 1);
      setQuantity(q => q - 1);
    }
  }

  const incrementQuantity = () => {
    changeFunction.current(quantity + 1);
    setQuantity(q => q + 1);
  }

  const closeModal = () => {
    setShowModal(false);
  }

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
              <View style={styles.title}>
                <Text style={styles.titleText}>Quantity:</Text>
              </View>
              <View style={styles.quantityRow}>
                <TouchableOpacity 
                  style={styles.arrowButton}
                  onPress={decrementQuantity}
                  accessibilityHint="decrement arrow">
                    <VectorImage 
                      style={styles.arrowIcon}
                      source={require('./../svgs/left.svg')} />
                </TouchableOpacity>
                <Text 
                  style={styles.quantityText}
                  accessibilityHint="quantity">
                    {quantity}
                </Text>
                <TouchableOpacity 
                  style={styles.arrowButton}
                  onPress={incrementQuantity}
                  accessibilityHint="increment arrow">
                    <VectorImage 
                      style={styles.arrowIcon}
                      source={require('./../svgs/right.svg')} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeModal}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>
  )
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
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 16,
    color: 'black',
  },
  quantityRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%'
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textDecorationLine: 'underline'
  },
  closeButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5
  },
  closeText: {
    fontSize: 14,
    color: 'black',
    paddingBottom: 5
  },
  arrowButton: {
    padding: 10
  },
  arrowIcon: {
    width: 35,
    height: 35
  },
})
export default QuantityModal;