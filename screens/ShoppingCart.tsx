import React, { useRef, useState } from 'react';
import {StyleSheet, View, Text, SafeAreaView, FlatList} from 'react-native';
import SelectModal from '../components/SelectModal';
import { useHookstate } from '@hookstate/core';
import { Cart } from '../store';
import Product from '../components/Product';

function ShoppingCart() {

  const products = useHookstate(Cart);
  const selectRef = useRef<any>();
  
  return (
    <SafeAreaView>
      <SelectModal 
          ref={selectRef}
          selectionString="Sizes" />
      <FlatList
        data={products.get()}
        renderItem={({item}) => <Product item={item} sizeSelector={selectRef}/>}
        keyExtractor={item => item.id.toString()}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cart: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShoppingCart;
