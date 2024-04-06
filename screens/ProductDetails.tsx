import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

function ProductDetails() {
  return (
    <View style={styles.cart}>
      <Text>
        This is the product details
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cart: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#35B8B1'
  },
});

export default ProductDetails;
