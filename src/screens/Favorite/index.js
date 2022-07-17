import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import {colors, fonts} from '../../res';

const Favorite = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Keranjang</Text>
        <View style={styles.cartWrapper}>
          <Text>3 Item</Text>
          <View></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGrey,
    height: '100%',
    padding: 14,
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
    marginBottom: 10,
  },
  cartWrapper: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
});
