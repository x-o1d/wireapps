import { useHookstate } from "@hookstate/core";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import VectorImage from 'react-native-vector-image';
import { Cart, FilteredProducts, Products } from "../store";
import SelectModal from "./SelectModal";
import { RootStackParamList } from "../App";

function ShoppingListHeader() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const cart = useHookstate(Cart);
  const products = useHookstate(Products);
  const filteredProducts = useHookstate(FilteredProducts);

  const [ searchText, setSearchText ] = useState('');
  const searchRef = useRef<TextInput>(null);
  const selectRef = useRef<any>();

  const sortOptions = ['Name', 'Brand', 'Colour', 'Price'];
  const [ selectedSort, setSelectedSort ] = useState(0);

  const sortFilteredProducts = (value: number) => {
    switch(value) {
      case 0: {
        filteredProducts.set(p => {
          return p.sort((a,b) => a.name.localeCompare(b.name));
        })
        break;
      }
      case 1: {
        filteredProducts.set(p => {
          return p.sort((a,b) => a.brandName.localeCompare(b.brandName));
        })
        break;
      }
      case 2: {
        filteredProducts.set(p => {
          return p.sort((a,b) => a.colour.localeCompare(b.colour));
        })
        break;
      }
      case 3: {
        filteredProducts.set(p => {
          return p.sort((a,b) => parseFloat(a.price.amount) - parseFloat(b.price.amount));
        })
        break;
      }
    }
  }

  const searchByName = (textInput: string) => {
    filteredProducts.set(products.value.filter(i => i.name.toLowerCase().includes(textInput.toLowerCase())));
    setSearchText(textInput);
    sortFilteredProducts(selectedSort);
  } 

  const clearSearch = () => {
    searchRef.current?.blur();
    setSearchText('');
    filteredProducts.set(JSON.parse(JSON.stringify(products.value)));
    sortFilteredProducts(selectedSort);
  }

  const sortPressed = () => {
    selectRef.current?.show(sortOptions, selectedSort, (value: number) => {
      setSelectedSort(value);
      sortFilteredProducts(value);
    })
  }

  return (
    <View style={styles.header}>
      <View style={styles.headerSearch}>
        <View style={styles.searchArea}>
          <TextInput
            style={styles.search}
            placeholder="Search in marketplace"
            onChangeText={searchByName} 
            value={searchText}
            ref={searchRef}/>
          {!!searchText && (
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={clearSearch}>
              <VectorImage
                style={styles.closeIcon}
                source={require('./../svgs/close.svg')} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {navigation.navigate('ShoppingCart')}}>
          <VectorImage 
            style={styles.cartIcon}
            source={require('./../svgs/cart.svg')} />
          <Text 
            style={styles.cartCount}
            accessibilityHint="cart count">
            ( {cart.value.reduce((a, c) => {
              return a + c.count;
            }, 0)} )
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <SelectModal ref={selectRef} selectionString={"Sort by"} />
        <TouchableOpacity 
          style={styles.sortButton}
          onPress={sortPressed}>
          <Text style={styles.sortText}>Sort by: </Text>
          <Text style={styles.sortSelectionText}>{sortOptions[selectedSort]}</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  )

  
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'column'
  },
  headerSearch: {
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
  searchArea: {
    position: 'relative',
    width: '80%'
  },
  search: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10
  },
  closeButton: {
    position: 'absolute',
    padding: 10,
    right: 0,
    top: 0,
  },
  closeIcon: {
    width: 20,
    height: 20
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
  },
  sortButton: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 10
  },
  sortText: {
    fontSize: 13
  },
  sortSelectionText: {
    fontSize: 13,
    textDecorationLine: 'underline'
  }
})

export default ShoppingListHeader;