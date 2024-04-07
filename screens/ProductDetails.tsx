import { useHookstate } from '@hookstate/core';
import React, { useEffect, useRef, useState } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { Cart, Products } from '../store';
import SelectModal from '../components/SelectModal';
import VectorImage from 'react-native-vector-image';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

function ProductDetails({ route }: NativeStackScreenProps<RootStackParamList, 'ProductDetails'>) {

  const products = useHookstate(Products);
  const cart = useHookstate(Cart);
  const product = products.value.find(p => p.SKU === route.params.SKU);

  const selectRef = useRef<any>();

  const [inCart, setInCart] = useState(0);

  // calculate the items in cart for the selected size
  useEffect(() => {
    const count = cart.value.reduce((a, c) => {
      if((c.SKU == product?.SKU) && (c.selectedSize == product?.selectedSize)) {
        return a + c.count;
      } else {
        return a;
      }
    }, 0);
    setInCart(count);
  }, [products.value, cart.value])

  // add item to cart
  // if an item with the same SKU and size exists increase count
  // else add new item
  const addToCart = () => {
    cart.set(p => {
      const itemIndex = p.findIndex(i => (i.SKU === product?.SKU && i.selectedSize === product?.selectedSize))
      if(itemIndex >= 0) {
        p[itemIndex].count++;
      } else {
        const itemCopy = JSON.parse(JSON.stringify(product));
        itemCopy.count = 1;
        p.push(itemCopy)
      }
      return p;
    })
  }

  return (
    <View style={styles.product}>
      <SelectModal 
          ref={selectRef}
          selectionString="Sizes" />
      <Image
        style={styles.mainImage} 
        source={{ uri: product?.mainImage }} />
      <Text style={styles.nameText}>
        {product?.name}
      </Text>
      <Text style={styles.brandText}>
        by {product?.brandName}
      </Text>
      <Text style={styles.descriptionText}>
        {product?.description}
      </Text>
      <Text style={styles.colourText}>
        Colour: {product?.colour}
      </Text>
      <Text style={styles.colourText}>
        Sizes: {product?.sizes.join(', ')}
      </Text>
      <Text style={styles.priceText}>
        {product?.price.amount} {product?.price.currency}
      </Text>
      {!!inCart && (<View style={styles.cartCount}>
          <VectorImage 
            style={styles.cartIcon}
            source={require('./../svgs/cart_black.svg')} />
          <Text> x {inCart}</Text>
        </View>)}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.sizeButton}
          onPress={() => {
            selectRef.current.show(product?.sizes, product?.selectedSize, (value: number) => {
              products.set(p => {
                const productIndex = p.findIndex(i => i.SKU === product?.SKU);
                p[productIndex].selectedSize = value;
                return p;
              })
            })
          }}>
          <Text style={styles.sizeButtonText}>Size: {product?.sizes[product.selectedSize]}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={addToCart}>
          <Text style={styles.checkoutButtonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%'
  },
  mainImage: {
    width: '100%',
    height: 200
  },
  nameText: {
    fontSize: 20,
    marginTop: 10,
    paddingLeft: 10,
    color: 'black',
  },
  brandText: {
    fontSize: 12,
    paddingLeft: 10,
    paddingBottom: 10,
    color: '#777777'
  },
  descriptionText: {
    fontSize: 14,
    paddingLeft: 10,
    paddingBottom: 10,
    color: '#666666'
  },
  colourText: {
    fontSize: 14,
    paddingLeft: 10,
    paddingBottom: 10,
    color: 'black'
  },
  priceText: {
    fontSize: 20,
    paddingLeft: 10,
    paddingBottom: 10,
    color: 'black'
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  },
  sizeButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    borderTopColor: '#35b8b1',
    borderTopWidth: 1
  },
  cartButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#35b8b1'
  },
  sizeButtonText: {
    fontSize: 20,
    color: 'black'
  },
  checkoutButtonText: {
    fontSize: 20,
    color: 'white'
  },
  cartCount: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10
  },
  cartIcon: {
    width: 20,
    height: 20
  },
});

export default ProductDetails;
