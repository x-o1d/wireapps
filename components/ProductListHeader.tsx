import { useHookstate } from "@hookstate/core";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, TextInput, StyleSheet, useWindowDimensions, Text, TouchableOpacity } from "react-native";
import VectorImage from 'react-native-vector-image';
import { Cart } from "../store";

function ProductListHeader() {

  const {height, width, scale, fontScale} = useWindowDimensions();
  const navigation = useNavigation();
  
  const cart = useHookstate(Cart);

  return (
    <View style={styles.header}>
      <TextInput
        style={styles.search}
        placeholder="Search in marketplace"/>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => {navigation.navigate('ShoppingCart')}}>
        <VectorImage 
          style={styles.cartIcon}
          source={require('./../svgs/cart.svg')} />
        <Text style={styles.cartCount}>
          ( {cart.get().length} )
        </Text>
      </TouchableOpacity>
    </View>
  )

  
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60,
    margin: 0,
    padding: 10,
    backgroundColor: '#35B8B1'
  },
  search: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10
  },
  cartButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  cartIcon: {
    width: 35,
    height: 35
  },
  cartCount: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  }
})

export default ProductListHeader;