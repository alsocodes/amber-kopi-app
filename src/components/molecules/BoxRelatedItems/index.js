import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../res';

const BoxRelatedItems = ({image, name, price, bgColor, onPress}) => {
  return (
    <TouchableOpacity style={styles.container(bgColor)} onPress={onPress}>
      <View style={styles.wrapperImage}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.wrapperDetail}>
        <Text flex="1" numberOfLines={2}>
          {name}
        </Text>
        {/* <View style={styles.rowDetail}>
          <Text style={styles.textPrice}>${price}</Text>
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

export default BoxRelatedItems;

const styles = StyleSheet.create({
  container: bgColor => ({
    // height: 140,
    width: 150,
    // backgroundColor: colors.lightGrey,
    borderRadius: 12,
    marginRight: 15,
    overflow: 'hidden',
  }),
  wrapperImage: {justifyContent: 'center', alignItems: 'center', flex: 1},
  image: {height: 70, width: '100%', resizeMode: 'cover'},
  wrapperDetail: {
    justifyContent: 'flex-start',
    padding: 5,
    height: 50,
    bgColor: colors.lightGrey,
  },
  rowDetail: {
    backgroundColor: colors.white,
    height: 25,
    width: '100%',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  // textPrice: {fontSize: 12, backgroundColor: colors.grey},
});
