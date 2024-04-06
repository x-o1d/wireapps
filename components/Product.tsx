import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Cart, ProductType, Products } from "../store";
import { ImmutableObject, useHookstate } from "@hookstate/core";
import VectorImage from 'react-native-vector-image';

function Product(props: {
  item: ImmutableObject<ProductType>,
  sizeSelector: any
}) {

  const cart = useHookstate(Cart);
  const products = useHookstate(Products);

  const addToCart = (item: ImmutableObject<ProductType>) => {
    cart.set(p => {
      const itemIndex = p.findIndex(i => (i.SKU === item.SKU && i.selectedSize === item.selectedSize))
      return [...p, item]
    })
  }

  return (
    <View style={styles.section}>
      <View style={styles.leftPane}>
        <Image 
          style={styles.image}
          source={{ uri: props.item.mainImage}} />
        <View>
          <Text style={styles.nameText}>{props.item.name}</Text>
          <Text style={styles.colourText}>Colour: {props.item.colour}</Text>
          <Text style={styles.priceText}>{props.item.price.amount} {props.item.price.currency}</Text>
          <Text style={styles.nameText}>{props.item.stockStatus}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableHighlight onPress={() => {
          props.sizeSelector.current.show(props.item.sizes, props.item.selectedSize, (value: number) => {
            products.set(p => {
              const productIndex = p.findIndex(i => i.SKU === props.item.SKU);
              p[productIndex].selectedSize = value;
              return p;
            })
          })
        }}>
          <View style={styles.cartButton}>
            <Text style={styles.buttonText}>Size: {props.item.sizes[props.item.selectedSize || 0]}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => addToCart(props.item)}>
          <View style={[styles.cartButton, styles.buyButton]}>
            <Text style={styles.buttonText}>Add to cart</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.cartCount}>
          <VectorImage 
            style={styles.cartIcon}
            source={require('./../svgs/cart_black.svg')} />
          <Text> x 0</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  leftPane: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 5,
    marginRight: 10,
  },
  nameText: {
    width: 170,
    fontSize: 12,
    color: 'black',
    marginBottom: 0
  },
  colourText: {
    width: 170,
    fontSize: 10,
    color: 'black',
    marginBottom: 5
  },
  priceText: {
    width: 170,
    fontSize: 16,
    color: 'black',
    marginBottom: 0
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: 100
  },
  cartButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#777777',
    borderWidth: 1,
    padding: 5,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 12,
    color: 'black'
  },
  buyButton: {
    backgroundColor: '#35b8b1',
    color: 'white',
  },
  cartCount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  cartIcon: {
    width: 20,
    height: 20
  },
});

export default Product;