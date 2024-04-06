import React, { useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import SelectModal from '../components/SelectModal';
import { Products } from '../store';
import { useHookstate } from '@hookstate/core';
import Product from '../components/Product';

function ProductList({ navigation }: NativeStackScreenProps<RootStackParamList>) {

  const products = useHookstate(Products);
  const selectRef = useRef<any>();
  
  useEffect(() => {
    fetch('https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json')
      .then(response => response.json())
      .then(json => {
        products.set(json.data);
      })
  }, [])

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
  
});

export default ProductList;
