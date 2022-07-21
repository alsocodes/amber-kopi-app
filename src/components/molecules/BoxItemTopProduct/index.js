import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {formatNumber} from '../../../helper/utils';
// import {Gap} from '../..';
import {colors, fonts, IC_Love} from '../../../res';

const BoxItemTopProduct = ({bgColor, icon, text, price, onPress}) => {
  return (
    <TouchableOpacity style={styles.container(bgColor)} onPress={onPress}>
      <View style={{top: -40}}>
        <View>
          <Image source={icon} style={styles.image} />
          {/* <Gap height={20} /> */}
          <Text numberOfLines={2} style={styles.text}>
            {text}
          </Text>
        </View>
        {/* <Gap height={20} /> */}
        <View style={styles.price}>
          <Text style={styles.wrapperButtom}>Rp{formatNumber(price)}</Text>
          <TouchableOpacity>
            <IC_Love />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BoxItemTopProduct;

const styles = StyleSheet.create({
  container: bgColor => ({
    height: 260,
    width: '43%',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 10,
    overflow: 'hidden',
  }),
  text: {
    paddingHorizontal: 8,
    fontSize: 16,
    fontFamily: fonts.Medium,
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  wrapperButtom: {
    fontSize: 18,
    fontFamily: fonts.Medium,
  },
  image: {
    height: 210,
    width: '100%',
    resizeMode: 'cover',
    // marginLeft: 20,
  },
});
