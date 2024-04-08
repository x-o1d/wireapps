import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Cart, ProductType} from '../store';
import {ImmutableObject, useHookstate} from '@hookstate/core';
import VectorImage from 'react-native-vector-image';

function CartListItem(props: {
  item: ImmutableObject<ProductType>;
  quantitySelector: any;
}) {
  const cart = useHookstate(Cart);

  const removeFromCart = (item: ImmutableObject<ProductType>) => {
    cart.set(p => {
      const itemIndex = p.findIndex(
        i => i.SKU === item.SKU && i.selectedSize === item.selectedSize,
      );
      if (p[itemIndex].count > 1) {
        p[itemIndex].count--;
      } else {
        p.splice(itemIndex, 1);
      }
      return p;
    });
  };

  return (
    <View style={styles.section}>
      <View style={styles.leftPane}>
        <Image style={styles.image} source={{uri: props.item.mainImage}} />
        <View>
          <Text style={styles.nameText}>{props.item.name}</Text>
          <Text style={styles.colourText}>Colour: {props.item.colour}</Text>
          <Text style={styles.priceText}>
            Size: {props.item.sizes[props.item.selectedSize]}
          </Text>
          <Text style={styles.nameText}>{props.item.stockStatus}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => removeFromCart(props.item)}
          accessibilityHint="remove from cart">
          <View style={[styles.cartButton]}>
            <Text style={styles.buttonText}>Remove</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.quantitySelector.current.show(
              props.item.count,
              (value: number) => {
                cart.set(p => {
                  const productIndex = p.findIndex(
                    i =>
                      i.SKU === props.item.SKU &&
                      i.selectedSize === props.item.selectedSize,
                  );
                  p[productIndex].count = value;
                  return p;
                });
              },
            );
          }}
          accessibilityHint="adjust quantity">
          <View style={[styles.cartButton]}>
            <VectorImage
              style={styles.cartIcon}
              source={require('./../svgs/cart_black.svg')}
            />
            <Text style={styles.buttonText}> x {props.item.count}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.cartCount}>
          <Text
            accessibilityHint="individual item prive"
            style={styles.priceText}>
            {props.item.price.amount} x {props.item.count}
          </Text>
        </View>
        <View style={styles.cartCount}>
          <Text accessibilityHint="item price" style={styles.priceText}>
            {(parseFloat(props.item.price.amount) * props.item.count).toFixed(
              2,
            )}{' '}
            {props.item.price.currency}
          </Text>
        </View>
      </View>
    </View>
  );
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
    justifyContent: 'flex-start',
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
    marginBottom: 0,
  },
  colourText: {
    width: 170,
    fontSize: 10,
    color: 'black',
    marginBottom: 5,
  },
  priceText: {
    fontSize: 12,
    color: 'black',
    marginBottom: 0,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: 100,
  },
  size: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5,
    marginBottom: 5,
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
    color: 'black',
  },
  buyButton: {
    backgroundColor: '#35b8b1',
    color: 'white',
  },
  cartCount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cartIcon: {
    width: 17,
    height: 17,
  },
});

export default CartListItem;
