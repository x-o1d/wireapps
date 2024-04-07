import React, { useRef } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import SelectModal from '../components/SelectModal';
import { Cart, FilteredProducts } from '../store';
import { useHookstate } from '@hookstate/core';
import ShoppingListItem from '../components/ShoppingListItem';

function ShoppingList({ navigation }: NativeStackScreenProps<RootStackParamList>) {

  const products = useHookstate(FilteredProducts);
  const cart = useHookstate(Cart);

  const selectRef = useRef<any>();

  return (
    <SafeAreaView style={styles.shoppingCart}>
      <SelectModal 
          ref={selectRef}
          selectionString="Size" />
      <FlatList
        style={[cart.value.length ? styles.productList: {}]}
        data={products.value}
        renderItem={({item}) => <ShoppingListItem item={item} sizeSelector={selectRef}/>}
        keyExtractor={item => item.id.toString()}/>
      {!!cart.value.length && <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('ShoppingCart')}>
          <Text style={styles.cartText}>Go to Cart</Text>
        </TouchableOpacity>
      </View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shoppingCart: {
    position: 'relative',
    height: '100%'
  },
  productList: {
    marginBottom: 50
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  cartButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#35b8b1',
    padding: 10
  },
  cartText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default ShoppingList;
