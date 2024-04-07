/**
 * Root element of the app:
 * this component sets up the ReactNavigator
 *
 * @format
 */

import React, { useEffect } from 'react';

import BootSplash from "react-native-bootsplash";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ShoppingList from './screens/ShoppingList';
import ShoppingCart from './screens/ShoppingCart';
import ProductDetails from './screens/ProductDetails';
import ShoppingListHeader from './components/ShoppingListHeader';
import { useHookstate } from '@hookstate/core';
import { FilteredProducts, ProductType, Products } from './store';

export type RootStackParamList = {
  ShoppingList: undefined;
  ShoppingCart: undefined;
  ProductDetails: {
    SKU: number
  };
};

function App(): React.JSX.Element {

  const Stack = createNativeStackNavigator();
  const products = useHookstate(Products);
  const filteredProducts = useHookstate(FilteredProducts);

  useEffect(() => {
    fetch('https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json')
      .then(response => response.json())
      .then(json => {
        const productList = json.data.map((item: ProductType) => {
          // initialize selected size to zero
          item.selectedSize = 0;
          return item;
        });
        products.set(productList);
        filteredProducts.set(productList);
        // sort by name (default sort)
        filteredProducts.set(p => {
          return p.sort((a,b) => a.name.localeCompare(b.name));
        })
        // hide the splash screen
        BootSplash.hide({ fade: true });
      })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="ShoppingList" 
          component={ShoppingList} 
          options={{
            headerBackVisible: false,
            header: () => <ShoppingListHeader />
          }}/>
        <Stack.Screen 
          name="ProductDetails" 
          component={ProductDetails} 
          options={{
            headerTitle: ''
          }}/>
        <Stack.Screen 
          name="ShoppingCart" 
          component={ShoppingCart} 
          options={{
            headerTintColor: '#35b8b1',
            headerTitle: 'Shopping Cart'
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
