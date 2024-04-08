import React, { useEffect, useRef, useState } from 'react';
import {StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import { useHookstate } from '@hookstate/core';
import { Cart } from '../store';
import CartListItem from '../components/CartListItem';
import QuantityModal from '../components/QuantityModal';

function ShoppingCart() {

  const cart = useHookstate(Cart);
  const cartEmpty = !cart.value.length;

  const [ totalCost, setTotalCost] = useState(0);
  const quantityRef = useRef<any>();

  useEffect(() => {
    const cost = cart.value.reduce((a, c) => {
      return a + (parseFloat(c.price.amount) * c.count)
    }, 0);
    setTotalCost(cost);
  }, [cart.value])

  return (
    <SafeAreaView style={styles.cart}>
      {cartEmpty && (
        <View style={styles.emptyCart}>
          <Text>No items in Cart</Text>
        </View>
      )}
      <QuantityModal ref={quantityRef} />
      <FlatList
        style={styles.cartList}
        data={cart.value}
        renderItem={({item}) => <CartListItem item={item} quantitySelector={quantityRef}/>}
        keyExtractor={item => item.id.toString() + item.sizes[item.selectedSize]}/>
      <View style={styles.footer}>
        <View style={styles.total}>
          <Text 
            accessibilityHint='total amount'
            style={styles.totalText}>Total: {totalCost.toFixed(2)} GBP</Text>
        </View>
        <TouchableOpacity 
          disabled={cartEmpty}
          style={[styles.checkoutButton, cartEmpty && styles.disabled]}>
          <Text style={styles.checkoutText}>Proceed to checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cart: {
    position: 'relative',
    height: '100%'
  },
  cartList: {
    marginBottom: 100
  },
  emptyCart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    padding: 10,
    backgroundColor: 'white'
  },
  totalText: {
    fontSize: 18,
    color: 'black'
  },
  checkoutButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#35b8b1',
    padding: 10
  },
  disabled: {
    backgroundColor: '#777777'
  },
  checkoutText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default ShoppingCart;
