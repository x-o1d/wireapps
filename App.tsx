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

import ProductList from './screens/ProductList';
import ShoppingCart from './screens/ShoppingCart';
import ProductDetails from './screens/ProductDetails';
import ProductListHeader from './components/ProductListHeader';

export type RootStackParamList = {
  ProductList: undefined;
  ShoppingCart: undefined;
  ProductDetails: undefined;
};

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    setTimeout(async () => {
      await BootSplash.hide({ fade: true });
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="ProductList" 
          component={ProductList} 
          options={{
            headerBackVisible: false,
            header: () => <ProductListHeader />
          }}/>
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen 
          name="ShoppingCart" 
          component={ShoppingCart} 
          options={{
            headerTintColor: '#35b8b1'
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
