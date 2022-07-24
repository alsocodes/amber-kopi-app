import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, IC_Back, IC_Cart, IC_Drawer} from '../../../res';

const Header = ({drawer, back, cart, onPress, title}) => {
  if (drawer) {
    return (
      <View style={styles.wrapperHeader}>
        <TouchableOpacity onPress={onPress}>
          <IC_Drawer />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <IC_Cart />
        </TouchableOpacity>
      </View>
    );
  }
  // if (back && cart) {
  //   return (
  //     <View style={styles.wrapperHeader}>
  //       <TouchableOpacity onPress={onPress}>
  //         <IC_Back />
  //       </TouchableOpacity>
  //       <TouchableOpacity onPress={onPress}>
  //         <IC_Cart />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.wrapperHeader}>
      <TouchableOpacity onPress={onPress} style={{padding: 10, width: 40}}>
        <IC_Back />
      </TouchableOpacity>
      {title && <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title}</Text>}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapperHeader: {
    flexDirection: 'row',
    // justifyContent: '',
    alignItems: 'center',
    // paddingHorizontal: 20,
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 10,
  },
});
