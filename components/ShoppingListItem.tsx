import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Cart, FilteredProducts, ProductType } from "../store";
import { ImmutableObject, useHookstate } from "@hookstate/core";
import VectorImage from 'react-native-vector-image';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";

function ShoppingListItem(props: {
  item: ImmutableObject<ProductType>,
  sizeSelector: any
}) {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // store variables
  const cart = useHookstate(Cart);
  const products = useHookstate(FilteredProducts);

  const [inCart, setInCart] = useState(0);

  // calculate the items in cart for the selected size
  useEffect(() => {
    const count = cart.value.reduce((a, c) => {
      if((c.SKU == props.item.SKU) && (c.selectedSize == props.item.selectedSize)) {
        return a + c.count;
      } else {
        return a;
      }
    }, 0);
    setInCart(count);
  }, [props.item.selectedSize, cart.value])

  const addToCart = (item: ImmutableObject<ProductType>) => {
    cart.set(p => {
      const itemIndex = p.findIndex(i => (i.SKU === item.SKU && i.selectedSize === item.selectedSize))
      if(itemIndex >= 0) {
        p[itemIndex].count++;
      } else {
        // make a copy of the products list item for the cart
        const itemCopy = JSON.parse(JSON.stringify(item));
        itemCopy.count = 1;
        p.push(itemCopy)
      }
      return p;
    })
  }

  return (
    <View style={styles.section}>
      <TouchableOpacity
        onPress={() => {navigation.navigate('ProductDetails', {SKU: props.item.SKU})}}>
        <View style={styles.leftPane}>
          <Image 
            style={styles.image}
            source={{ uri: props.item.mainImage}} />
          <View>
            <Text style={styles.nameText}>{props.item.name}</Text>
            <Text style={styles.colourText}>Colour: {props.item.colour}</Text>
            <Text style={styles.priceText}>{props.item.price.amount} {props.item.price.currency}</Text>
            <Text style={styles.stockText}>{props.item.stockStatus}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.buttons}>
        <TouchableOpacity 
          onPress={() => {
            props.sizeSelector.current.show(props.item.sizes, props.item.selectedSize, (value: number) => {
              products.set(p => {
                const productIndex = p.findIndex(i => i.SKU === props.item.SKU);
                p[productIndex].selectedSize = value;
                return p;
              })
            })
          }}
          accessibilityRole="button">
          <View style={styles.cartButton}>
            <Text style={styles.buttonText}>Size: {props.item.sizes[props.item.selectedSize]}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addToCart(props.item)}>
          <View style={[styles.cartButton, styles.buyButton]}>
            <Text style={styles.buttonText}>Add to cart</Text>
          </View>
        </TouchableOpacity>
        {!!inCart && (<View style={styles.cartCount}>
          <VectorImage 
            style={styles.cartIcon}
            source={require('./../svgs/cart_black.svg')} />
          <Text> x {inCart}</Text>
        </View>)}
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
    backgroundColor: '#777777'
  },
  nameText: {
    width: 170,
    fontSize: 12,
    color: 'black',
    marginBottom: 0,
    textDecorationLine: 'underline'
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
  stockText: {
    width: 170,
    fontSize: 12,
    color: 'black',
    marginBottom: 0,
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

export default ShoppingListItem;