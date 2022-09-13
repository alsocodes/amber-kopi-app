import {Text} from 'native-base';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {formatNumber} from '../../../helper/utils';
import {colors} from '../../../res';

const BoxItemTopProduct = ({bgColor, icon, text, price, onPress, index}) => {
  return (
    <TouchableOpacity
      style={styles.container(bgColor, index)}
      onPress={onPress}>
      <View style={{top: -40}}>
        <View>
          <Image source={icon} style={styles.image} />
          <Text
            numberOfLines={2}
            fontSize={16}
            color={'gray.600'}
            px={2}
            fontWeight={'semibold'}>
            {text}
          </Text>
        </View>
        <View style={styles.price}>
          <Text fontSize={16} color={'gray.600'}>
            Rp{formatNumber(price)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BoxItemTopProduct;

const styles = StyleSheet.create({
  container: (bgColor, index) => ({
    height: 260,
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginVertical: 10,
    marginRight: index % 2 === 0 ? '2%' : 0,
    marginLeft: index % 2 !== 0 ? '2%' : 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  }),
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    fontSize: 14,
  },

  image: {
    height: 210,
    width: '100%',
    resizeMode: 'cover',
    // marginLeft: 20,
  },
});
